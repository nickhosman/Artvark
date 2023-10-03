from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import Post, PostImage, db, User, Reaction
from ..api.auth_routes import validation_errors_to_error_messages

post_routes = Blueprint("posts", __name__)

@post_routes.route("/")
def get_posts():
  """
  Get all posts
  """
  all_posts = Post.query.all()
  post_dict = {}
  for post in all_posts:
    data = post.to_dict()

    post_dict[str(post.id)] = data
  return post_dict


@post_routes.route("/<int:postId>")
def get_post_details(postId):
  """
  Get a single posts details by id
  """
  post = Post.query.get(postId)

  if not post:
    return {"errors": "Post not found"}, 404

  return post.to_dict_with_reactions()


@post_routes.route("/new", methods=["POST"])
@login_required
def create_post():
  """
  Adds a post to the database
  """
