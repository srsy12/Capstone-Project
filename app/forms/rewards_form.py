from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Reward


class RewardsForm(FlaskForm):
    campaign_id = IntegerField("campaign_id")
    name = StringField("name", validators=[DataRequired()])
    price = IntegerField("price", validators=[DataRequired()])
    rewards = StringField("rewards", validators=[DataRequired()])
