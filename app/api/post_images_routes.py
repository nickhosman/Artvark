from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms import PostImagesForm
from ..models import PostImage, Post, db
from ..api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

post_image_routes = Blueprint("images", __name__)
