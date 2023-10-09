from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms import PostForm, PostImagesForm, ReactionForm, BulkPostImagesForm
from ..models import Post, PostImage, db, Reaction
from ..api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

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
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    post = Post(
      title = form.data["title"],
      user_id = current_user.id
    )
    db.session.add(post)
    db.session.commit()

    imageForm = BulkPostImagesForm()
    imageForm['csrf_token'].data = request.cookies['csrf_token']
    if imageForm.validate_on_submit():
      image1 = imageForm.data["image1"]
      image2 = imageForm.data["image2"]
      image3 = imageForm.data["image3"]
      image4 = imageForm.data["image4"]

      images = [image1, image2, image3, image4]

      for i, image in enumerate(images):
        if image != None:
          image.filename = get_unique_filename(image.filename)
          upload = upload_file_to_s3(image)
          print("UPLOAD RESULTS:", upload)

          if "url" not in upload:
            print({"errors": [upload]})
            return {"errors": [upload]}

          url = upload["url"]
          if i == 0:
            new_image = PostImage(url=url, preview=True, post_id = post.id)
          else:
            new_image = PostImage(url=url, preview=False, post_id = post.id)
          db.session.add(new_image)
      db.session.commit()
      return post.to_dict(), 201
    post = Post.query.get(post.id)
    db.session.delete(post)
    db.session.commit()
    return {'errors': validation_errors_to_error_messages(imageForm.errors)}, 400
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# @post_routes.route("/<int:postId>/images", methods=["POST"])
# @login_required
# def bulk_add_images_to_post(postId):
#   """
#   Adds images to a post by id
#   """
#   form = PostImagesForm()
#   form['csrf_token'].data = request.cookies['csrf_token']
#   if form.validate_on_submit():

#     image1 = form.data["image1"]
#     image2 = form.data["image2"]
#     image3 = form.data["image3"]
#     image4 = form.data["image4"]

#     images = [image1, image2, image3, image4]

#     for i, image in enumerate(images):
#       if image != None:
#         image.filename = get_unique_filename(image.filename)
#         upload = upload_file_to_s3(image)
#         print("UPLOAD RESULTS:", upload)

#         if "url" not in upload:
#           print({"errors": [upload]})
#           return {"errors": [upload]}

#         url = upload["url"]
#         if i == 0:
#           new_image = PostImage(url=url, preview=True, post_id=postId)
#         else:
#           new_image = PostImage(url=url, preview=False, post_id=postId)
#         db.session.add(new_image)
#     db.session.commit()
#     post = Post.query.get(postId)
#     return post.to_dict_with_reactions()

#   if form.errors:
#     print("ERRORS:", form.errors)
#     return {"errors": form.errors}, 400


@post_routes.route("/<int:postId>/images", methods=["POST"])
@login_required
def add_image_to_post(postId):
  """
  Add an image to a post
  """
  post = Post.query.get(postId)

  is_first = len(post.post_images) == 0

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

    url = upload["url"]
    new_image = PostImage(url=url, preview=is_first, post_id=postId)

    db.session.add(new_image)
    db.session.commit()
    return post.to_dict_with_reactions()

  if form.errors:
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@post_routes.route("/<int:postId>", methods=["DELETE"])
@login_required
def delete_post(postId):
  """
  Delete a post
  """
  post = Post.query.get(postId)
  if not post:
    return {"errors": "Post not found"}, 404

  if post.user_id != current_user.id:
    return {"error": "Unauthorized"}, 401

  image_urls = [image.url for image in post.post_images]
  [remove_file_from_s3(url) for url in image_urls]

  db.session.delete(post)
  db.session.commit()


  return {"message": "Successfully deleted post."}


@post_routes.route("/<int:postId>", methods=["PUT"])
@login_required
def edit_post(postId):
  """
  Update a post title
  """
  post = Post.query.get(postId)

  if not post:
    return {"error": "Post not found"}, 404

  if post.user_id != current_user.id:
    return {"error": "Unauthorized"}, 401

  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    post.title = form.data["title"]
    db.session.commit()

    return post.to_dict(), 201

  if form.errors:
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@post_routes.route("/<int:postId>/reactions")
def get_reactions_by_post(postId):
  """
  Get reactions related to a specific post
  """
  post = Post.query.get(postId)

  if not post:
    return {"error": "Post not found"}, 404

  reactions = Reaction.query.filter_by(post_id=postId).all()
  reaction_dict = {}
  for reaction in reactions:
    data = reaction.to_dict()

    reaction_dict[str(reaction.id)] = data
  return reaction_dict


@post_routes.route("/<int:postId>/reactions", methods=["POST"])
@login_required
def add_reaction_to_post(postId):
  """
  Add a reaction to a post
  """
  form = ReactionForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    reaction = Reaction(
      post_id = postId,
      user_id = current_user.id,
      content = form.data["content"],
    )

    db.session.add(reaction)
    db.session.commit()
    return reaction.to_dict(), 201
  return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@post_routes.route("/<int:postId>/likes", methods=["POST"])
@login_required
def add_like_to_post(postId):
  """
  Add a like to a post
  """
  post = Post.query.get(postId)
  if not post:
    return {"errors": "Post not found"}, 404

  if post in current_user.user_likes:
    return {"errors": "User already liked this post"}, 400

  post.post_likes.append(current_user)
  db.session.commit()
  return {"message": "Successfully liked post"}


@post_routes.route("/<int:postId>/likes", methods=["DELETE"])
@login_required
def remove_like_from_post(postId):
  """
  Remove a like from a post
  """
  post = Post.query.get(postId)
  if not post:
    return {"errors": "Post not found"}, 404

  if current_user not in post.post_likes:
    return {"errors": "User has not liked this post"}, 401

  post.post_likes.remove(current_user)
  db.session.commit()

  return {"message": "Successfully removed like from post"}, 200
