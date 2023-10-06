from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class BulkPostImagesForm(FlaskForm):
  image1 = FileField("image1", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  image2 = FileField("image2", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  image3 = FileField("image3", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  image4 = FileField("image4", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
