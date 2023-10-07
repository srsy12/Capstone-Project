from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Campaign


class CampaignForm(FlaskForm):
    owner_id = IntegerField("owner")
    image_url = StringField("image", validators=[DataRequired()])
    state = StringField("state", validators=[DataRequired()])
    country = StringField("country", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    goal = IntegerField("goal", validators=[DataRequired()])
