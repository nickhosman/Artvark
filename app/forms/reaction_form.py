from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class ReactionForm(FlaskForm):
  content = StringField("content", validators=[DataRequired(), Length(min=1, max=10)])
