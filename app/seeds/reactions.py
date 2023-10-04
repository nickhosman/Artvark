from ..models import db, Reaction, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reactions():
  reactions = [
    Reaction(
      post_id = 1,
      user_id = 2,
      content = "🤩👀"
    ),
    Reaction(
      post_id = 2,
      user_id = 3,
      content = "👏🤟🤙"
    ),
    Reaction(
      post_id = 3,
      user_id = 1,
      content = "🙀😻"
    ),
    Reaction(
      post_id = 1,
      user_id = 3,
      content = "😱💀"
    ),
    Reaction(
      post_id = 2,
      user_id = 1,
      content = "😶👨‍🎓"
    ),
    Reaction(
      post_id = 3,
      user_id = 2,
      content = "👨‍🍳🕶"
    )
  ]

  db.session.add_all(reactions)
  db.session.commit()
  return reactions

def undo_reactions():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM reactions"))
  db.session.commit()
