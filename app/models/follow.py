from .db import db, add_prefix_for_prod, environment, SCHEMA

follows = db.Table(
  "follows",

  db.Column(
    "follower_id",
    db.Integer,
    db.ForeignKey(add_prefix_for_prod("users.id")),
    primary_key=True
  ),
  db.Column(
    "followed_id",
    db.Integer,
    db.ForeignKey(add_prefix_for_prod("users.id")),
    primary_key=True
  )
)

if environment == "production":
  follows.schema = SCHEMA
