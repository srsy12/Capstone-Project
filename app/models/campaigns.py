from .db import db, environment, SCHEMA, add_prefix_for_prod


class Campaign(db.Model):
    __tablename__ = "campaigns"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    image_url = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    tagline = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    current_funds = db.Column(db.Integer, default=0)
    goal = db.Column(db.Integer, nullable=False)

    owner = db.relationship("User", back_populates="campaigns")
    rewards = db.relationship("Reward", back_populates="campaign")

    def no_description(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "owner": self.owner.to_dict(),
            "image_url": self.image_url,
            "state": self.state,
            "country": self.country,
            "name": self.name,
            "tagline": self.tagline,
            "current_funds": self.current_funds,
            "goal": self.goal,
        }

    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "owner": self.owner.to_dict(),
            "image_url": self.image_url,
            "state": self.state,
            "country": self.country,
            "name": self.name,
            "tagline": self.tagline,
            "description": self.description,
            "current_funds": self.current_funds,
            "goal": self.goal,
        }
