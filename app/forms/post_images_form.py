from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class PostImagesForm(FlaskForm):
  image1 = FileField("Image1", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  image2 = FileField("Image2", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  image3 = FileField("Image3", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  image4 = FileField("Image4", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
