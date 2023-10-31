from .db import db, environment, SCHEMA, add_prefix_for_prod
from .follow import follows
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    profile_img = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    #relationships
    reactions = db.relationship("Reaction", back_populates="user")
    posts = db.relationship("Post", back_populates="user")
    user_likes = db.relationship("Post", secondary="likes", back_populates="post_likes")
    followers = db.relationship(
        "User",
        secondary="follows",
        primaryjoin=follows.columns.followed_id == id,
        secondaryjoin=follows.columns.follower_id == id,
        backref="following")
    # following = db.relationship("User", secondary="follows", back_populates="followers")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        like_dicts = [like.to_dict() for like in self.user_likes]
        following_dicts = [user.to_dict_no_likes()["username"] for user in self.following]
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'profileImg': self.profile_img,
            'likes': like_dicts,
            'following': following_dicts
        }

    def to_dict_no_likes(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'profileImg': self.profile_img
        }
