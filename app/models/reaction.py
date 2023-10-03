from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Reaction(db.Model):
  __tablename__ = 'reactions'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  content = db.Column(db.String(10), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

  #relationships
  user = db.relationship("User", back_populates="reactions")
  post = db.relationship("Post", back_populates="reactions")

  def to_dict(self):
    return {
      "id": self.id,
      "postId": self.post_id,
      "content": self.content,
      "author": self.user.to_dict(),
      "createdAt": self.created_at,
      "updatedAt": self.updated_at
    }
