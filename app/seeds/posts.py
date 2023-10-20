from ..models import db, Post, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_posts(users):
  posts = [
    Post(
      title = "Happy Landscape",
      user_id = 1,
      post_likes = [users[2]]
    ),
    Post(
      title = "Abstract Thoughts",
      user_id = 2
    ),
    Post(
      title = "Colorful Display",
      user_id = 3
    ),
    Post(
      title= "Layers",
      user_id = 4
    ),
    Post(
      title = "Doorway",
      user_id = 5
    ),
    Post(
      title = "Abstract Sculpture",
      user_id = 6
    ),
    Post(
      title = "Falling",
      user_id = 1
    ),
    Post(
      title = "Down the Hall",
      user_id = 2
    ),
    Post(
      title = "Lost in the Forest",
      user_id = 3
    ),
    Post(
      title = "Voidspace",
      user_id = 4
    ),
    Post(
      title = "Sakura Island",
      user_id = 1
    ),
    Post(
      title = "Leaves",
      user_id = 5
    ),
    Post(
      title = "Cheerful Cottage",
      user_id = 6
    ),
    Post(
      title = "Morning Coffee",
      user_id = 3
    ),
    Post(
      title = "Vector Practice",
      user_id = 6
    ),
    Post(
      title = "Clouds",
      user_id = 3
    ),
    Post(
      title = "What Do You See?",
      user_id = 4
    ),
    Post(
      title = "Fantasy World",
      user_id = 5
    ),
    Post(
      title = "Wallpaper",
      user_id = 2
    ),
    Post(
      title = "Animals",
      user_id = 4
    ),
    Post(
      title = "Whirlpool",
      user_id = 1
    ),
    Post(
      title = "Dot Map",
      user_id = 3
    ),
    Post(
      title = "Vector Tests",
      user_id = 5
    ),
    Post(
      title = "Inlay",
      user_id = 1
    ),
    Post(
      title = "Galaxy",
      user_id = 2
    ),
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
