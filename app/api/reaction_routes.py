from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms import ReactionForm
from ..models import Reaction, db
from ..api.auth_routes import validation_errors_to_error_messages

reaction_routes = Blueprint("reactions", __name__)

@reaction_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_reaction(id):
  """
  Edit a reaction
  """
  reaction = Reaction.query.get(id)

  if not reaction:
    return {"error": "Reaction not found"}, 404

  if reaction.user_id != current_user.id:
    return {"error": "Unauthorized"}, 401

  form = ReactionForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    reaction.content = form.data["content"]
    db.session.commit()
    return reaction.to_dict(), 201
  return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@reaction_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_reaction(id):
  """
  Delete a reaction
  """
  reaction = Reaction.query.get(id)

  if not reaction:
    return {"error": "Reaction not found"}, 404

  if reaction.user_id != current_user.id:
    return {"error": "Unauthorized"}, 401

  db.session.delete(reaction)
  db.session.commit()

  return {"message": "Successfully deleted reaction"}
