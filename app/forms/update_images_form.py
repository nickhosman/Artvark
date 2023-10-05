from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class EditPostImagesForm(FlaskForm):
  image = FileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
