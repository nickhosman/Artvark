from ..models import db, Post, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_posts():
  posts = [
    Post(
      title = "Happy Landscape",
      user_id = 1
    ),
    Post(
      title = "Abstract Thoughts",
      user_id = 2
    ),
    Post(
      title = "Colorful Display",
      user_id = 3
    )
  ]

  db.session.add_all(posts)
  db.session.commit()
  return posts

def undo_posts():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM posts"))
  db.session.commit()
