from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms import PostImagesForm
from ..models import PostImage, Post, db
from .auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

post_image_routes = Blueprint("images", __name__)

@post_image_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_post_image(id):
  post_image = PostImage.query.get(id)

  if not post_image:
    return {"errors": "That image could not be found"}, 404

  form = PostImagesForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    image = form.data["image"]

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print("UPLOAD RESULTS:", upload)

    if "url" not in upload:
      print({"errors": [upload]})
      return {"errors": [upload]}

    new_url = upload["url"]
    remove_file_from_s3(post_image.url)
    post_image.url = new_url
    db.session.commit()
    return post_image.to_dict()

  if form.errors:
    return {"errors": form.errors}, 400
