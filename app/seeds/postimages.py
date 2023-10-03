from ..models import PostImage, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_post_images():
  post_images = [
    PostImage(url="https://cdn.pixabay.com/photo/2021/04/26/01/39/trees-6207925_1280.jpg", preview=True, post_id=1),
    PostImage(url="https://images.pexels.com/photos/1856455/pexels-photo-1856455.jpeg", preview=False, post_id=1),
    PostImage(url="https://images.pexels.com/photos/2123667/pexels-photo-2123667.jpeg", preview=True, post_id=2),
    PostImage(url="https://images.pexels.com/photos/1985664/pexels-photo-1985664.jpeg", preview=False, post_id=2),
    PostImage(url="https://images.pexels.com/photos/1486243/pexels-photo-1486243.jpeg", preview=True, post_id=3),
    PostImage(url="https://images.pexels.com/photos/2085588/pexels-photo-2085588.jpeg", preview=False, post_id=3)
  ]

  db.session.add_all(post_images)
  db.session.commit()
  return post_images

def undo_post_images():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.post_images RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM post_images"))
  db.session.commit()
