from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class PostForm(FlaskForm):
  title = StringField("title", validators=[DataRequired(), Length(min=1, max=25)])
