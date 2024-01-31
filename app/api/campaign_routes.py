from flask import Blueprint, jsonify, session, request
from app.models import db, Campaign, CampaignImage
from app.forms import CampaignForm, CampaignImageForm
from flask_login import current_user, login_required
from app.api.aws_routes import (
    upload_file_to_s3,
    get_unique_filename,
    remove_file_from_s3,
)

campaign_routes = Blueprint("campaign", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


# View all Campaigns
@campaign_routes.route("/")
def get_campaigns():
    campaigns = Campaign.query.all()
    results = []
    for campaign in campaigns:
        results.append(campaign.no_description())
    return results


# View Details of a specific Campaign
@campaign_routes.route("/<int:id>")
def get_one_campaign(id):
    campaign = Campaign.query.get(id)
    if campaign:
        return campaign.to_dict()
    return {"error": "Campaign not found"}, 404


# Create a Campaign
@campaign_routes.route("/new", methods=["POST"])
@login_required
def create_campaign():
    form = CampaignForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit:
        campaign = Campaign(
            owner_id=current_user.id,
            state=form.data["state"],
            country=form.data["country"],
            name=form.data["name"],
            tagline=form.data["tagline"],
            description=form.data["description"],
            goal=form.data["goal"],
        )
        db.session.add(campaign)
        db.session.commit()
        return campaign.no_rewards()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# Create a Campaign Image
@campaign_routes.route("/<int:id>/image/new", methods=["POST"])
@login_required
def create_campaign_image(id):
    campaign = Campaign.query.get(id)

    if campaign:
        if campaign.owner_id == current_user.id:
            form = CampaignImageForm()
            form["csrf_token"].data = request.cookies["csrf_token"]
            if form.validate_on_submit:
                image = form.data["url"]
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                print(upload)

                if "url" not in upload:
                    return {"errors": [upload]}
                url = upload["url"]
                campaignImage = CampaignImage(campaign_id=id, url=url)
                db.session.add(campaignImage)
                db.session.commit()
                return campaignImage.to_dict()
            return {"errors": validation_errors_to_error_messages(form.errors)}, 401
        return {
            "errors": "You must be the campaign owner to complete this action!"
        }, 401
    return {"errors": "This campaign does not exist!"}


# Delete campaign Image
@campaign_routes.route("/image/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_campaign_image(id):
    campaignImage = CampaignImage.query.get(id)

    if campaignImage:
        url = campaignImage.url
        deleted = remove_file_from_s3(url)
        print(deleted)
        db.session.delete(campaignImage)
        db.session.commit()
    return {"errors": "This campaign image does not exist!"}


# Update a Campaign
@campaign_routes.route("/update/<int:id>", methods=["PUT"])
@login_required
def update_campaign(id):
    form = CampaignForm()

    campaign = Campaign.query.get(id)

    if campaign:
        if campaign.owner_id == current_user.id:
            form["csrf_token"].data = request.cookies["csrf_token"]
            if form.validate_on_submit():
                campaign.state = form.data["state"]
                campaign.country = form.data["country"]
                campaign.name = form.data["name"]
                campaign.tagline = form.data["tagline"]
                campaign.description = form.data["description"]
                campaign.goal = form.data["goal"]
                db.session.commit()
                return campaign.to_dict()
            return {"errors": validation_errors_to_error_messages(form.errors)}, 401
        return {"errors": "You must own this campaign to perform this action!"}, 401
    return {"error": "Campaign not found"}, 404


# Delete a Campaign
@campaign_routes.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete_campaign(id):
    campaign = Campaign.query.get(id)

    if campaign:
        if campaign.owner_id == current_user.id:
            db.session.delete(campaign)
            db.session.commit()
            return {"message": "Campaign successfully deleted"}
        return {"errors": "You must own this campaign to complete this action!"}, 401
    return {"error": "Campaign not found"}, 404


@campaign_routes.route("/search")
def search_filter():
    query = request.args.get("query")

    # results = []
    # campaign = Campaign.query.get(1)
    # if query in list(campaign.no_description().values()):
    #     results.append(campaign.no_description())
    # return results
    results = []
    campaigns = Campaign.query.all()

    if query:
        for campaign in campaigns:
            for value in list(campaign.to_dict().values()):
                if isinstance(value, str):
                    if query.lower() in value.lower():
                        if campaign.no_description() not in results:
                            results.append(campaign.no_description())
    else:
        for campaign in campaigns:
            results.append(campaign.no_description())

    return results


@campaign_routes.route("/user/<int:id>")
@login_required
def my_campaigns(id):
    campaigns = Campaign.query.filter(Campaign.owner_id == current_user.id)
    results = []
    for campaign in campaigns:
        results.append(campaign.no_description())
    return results
