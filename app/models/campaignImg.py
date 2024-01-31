from .db import db, environment, SCHEMA, add_prefix_for_prod


class CampaignImage(db.Model):
    __tablename__ = "campaign_images"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    campaign_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("campaigns.id"))
    )
    url = db.Column(db.String, nullable=False)

    campaign_img = db.relationship("Campaign", back_populates="campaign_images")

    def to_dict(self):
        return {"id": self.id, "campaign_id": self.campaign_id, "url": self.url}
