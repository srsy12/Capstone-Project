from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    campaigns = db.relationship(
        "Campaign", back_populates="owner", cascade="all, delete-orphan"
    )
    supports = db.relationship("Support", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        campaigns_list = [campaign.no_owner() for campaign in self.campaigns]
        supports_list = [support.campaigns_list() for support in self.supports]
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "campaigns": campaigns_list,
            "supports": supports_list,
        }

    def no_campaign(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
        }
