from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import User, Post, db
from ..api.auth_routes import validation_errors_to_error_messages

follow_routes = Blueprint("follows", __name__)

@follow_routes.route("/<int:userId>", methods=["POST"])
@login_required
def follow_user(userId):
  """
  Follow a user
  """
  user = User.query.get(userId)
  if not user:
    return {"errors": "User not found"}, 404

  if user in current_user.following:
    return {"errors": "You already follow this user."}, 400

  current_user.following.append(user)
  db.session.commit()
  return {"message": "Succesfully followed user"}, 201


@follow_routes.route("/<int:userId>", methods=["DELETE"])
@login_required
def unfollow_user(userId):
  """
  Unfollow a user
  """
  user = User.query.get(userId)
  if not user:
    return {"errors": "User not found"}, 404

  if user not in current_user.following:
    return {"errors": "You are not following this user."}, 400

  current_user.following.remove(user)
  db.session.commit()

  return {"message": "Succesfully unfollowed user"}, 201
