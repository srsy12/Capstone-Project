from .db import db, environment, SCHEMA, add_prefix_for_prod


class Support(db.Model):
    __tablename__ = "supports"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    campaign_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("campaigns.id"))
    )
    reward_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("rewards.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    campaign = db.relationship(
        "Campaign",
        back_populates="supports",
    )
    reward = db.relationship(
        "Reward",
        back_populates="supports",
    )
    user = db.relationship(
        "User",
        back_populates="supports",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "campaign_id": self.campaign_id,
            "rewards_id": self.reward_id,
            "user_id": self.user_id,
        }

    def supporter_id(self):
        return {
            "user_id": self.user_id,
        }

    def campaigns_list(self):
        # campaigns_list = [campaign.no_description() for campaign in self.campaign]
        return {"campaigns": self.campaign.no_owner()}
