from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import Campaign
from app.api.aws_routes import ALLOWED_EXTENSIONS


class CampaignForm(FlaskForm):
    owner_id = IntegerField("owner")
    state = StringField("state", validators=[DataRequired()])
    country = StringField("country", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    tagline = TextAreaField("tagline", validators=[DataRequired()])
    description = TextAreaField("description", validators=[DataRequired()])
    goal = IntegerField("goal", validators=[DataRequired()])
