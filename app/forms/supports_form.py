from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Support


class SupportForm(FlaskForm):
    user_id = IntegerField("user")
    campaign_id = IntegerField("campaign")
    reward_id = IntegerField("reward")
