from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
  __tablename__ = 'posts'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

  #relationships
  user = db.relationship("User", back_populates="posts")
  reactions = db.relationship("Reaction", back_populates="post", cascade="all, delete, delete-orphan")
  post_images = db.relationship("PostImage", back_populates="post", cascade="all, delete, delete-orphan")
  post_likes = db.relationship("User", secondary="likes", back_populates="user_likes")

  def to_dict(self):
    image_dict = dict(zip([image.id for image in self.post_images], [image.to_dict() for image in self.post_images]))
    like_ids = [user.id for user in self.post_likes]
    previewImg = None
    for image in self.post_images:
      if image.preview:
        previewImg = image.url
        break
    return {
      "id": self.id,
      "title": self.title,
      "author": self.user.to_dict_no_likes(),
      "createdAt": self.created_at,
      "updatedAt": self.updated_at,
      "postImages": image_dict,
      "previewImg": previewImg,
      "numReactions": len(self.reactions),
      "likes": like_ids,
    }

  def to_dict_with_reactions(self):
    image_dict = dict(zip([image.id for image in self.post_images], [image.to_dict() for image in self.post_images]))
    reaction_dict = dict(zip([reaction.id for reaction in self.reactions], [reaction.to_dict() for reaction in self.reactions]))
    return {
      "id": self.id,
      "title": self.title,
      "author": self.user.to_dict_no_likes(),
      "createdAt": self.created_at,
      "updatedAt": self.updated_at,
      "postImages": image_dict,
      "reactions": reaction_dict
    }
