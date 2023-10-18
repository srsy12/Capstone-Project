from flask import Blueprint, jsonify, session, request
from app.models import db, Campaign, Reward
from app.forms import RewardsForm
from flask_login import current_user, login_required

rewards_routes = Blueprint("rewards", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


# View all Rewards
@rewards_routes.route("/")
def get_rewards():
    rewards = Reward.query.all()
    results = []
    for reward in rewards:
        results.append(reward.to_dict())
    return results


# View Details of one Reward
@rewards_routes.route("/<int:id>")
def get_one_reward(id):
    reward = Reward.query.get(id)
    if reward:
        return reward.to_dict()
    return {"error": "Reward not found"}, 404


# Create a Reward Tier
@rewards_routes.route("/campaign/<int:id>/new", methods=["POST"])
@login_required
def create_reward(id):
    campaign = Campaign.query.get(id)

    form = RewardsForm()

    if campaign:
        if campaign.owner_id == current_user.id:
            form["csrf_token"].data = request.cookies["csrf_token"]
            if form.validate_on_submit:
                reward = Reward(
                    campaign_id=campaign.id,
                    name=form.data["name"],
                    price=form.data["price"],
                    description=form.data["description"],
                )
                db.session.add(reward)
                db.session.commit()
                return reward.to_dict()
            return {"errors": validation_errors_to_error_messages(form.errors)}, 401
        return {"errors": "You must own this campaign to perform this action!"}, 401
    return {"error": "Campaign not found"}, 404


# View all Rewards of a Campaign
@rewards_routes.route("/campaign/<int:id>")
def get_specific_rewards(id):
    campaign = Campaign.query.get(id)
    if campaign:
        rewards = Reward.query.filter(Reward.campaign_id == campaign.id).order_by(
            Reward.price
        )
        results = []
        for reward in rewards:
            results.append(reward.to_dict())
        if len(results):
            return results
        return {"erorrs": "No Reward Tiers found for this campaign"}, 404
    return {"error": "Campaign not found"}, 404


# Update the details of a specific Reward
@rewards_routes.route("/edit/<int:id>", methods=["PUT"])
@login_required
def update_one_reward(id):
    reward = Reward.query.get(id)

    form = RewardsForm()

    if reward:
        campaign = Campaign.query.get(reward.campaign_id)
        if campaign.owner_id == current_user.id:
            form["csrf_token"].data = request.cookies["csrf_token"]
            if form.validate_on_submit():
                reward.name = form.data["name"]
                reward.price = form.data["price"]
                reward.description = form.data["description"]
                db.session.commit()
                return reward.to_dict()
            return {"errors": validation_errors_to_error_messages(form.errors)}, 401
        return {"errors": "You must own this reward to perform this action!"}, 401
    return {"error": "Reward not found"}, 404


# Delete a Reward Tier
@rewards_routes.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete_reward(id):
    reward = Reward.query.get(id)

    if reward:
        campaign = Campaign.query.get(reward.campaign_id)
        if campaign.owner_id == current_user.id:
            db.session.delete(reward)
            db.session.commit()
            return {"message": "Reward successfully deleted"}
        return {"errors": "You must own this reward to complete this action!"}, 401
    return {"error": "Reward not found"}, 404
