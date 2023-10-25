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
    ),
    Reaction(
      post_id = 4,
      user_id = 1,
      content = "🍨📜💂"
    ),
    Reaction(
      post_id = 4,
      user_id = 6,
      content = "🔶👥🚑🐲"
    ),
    Reaction(
      post_id = 5,
      user_id = 3,
      content = "🚱🕍"
    ),
    Reaction(
      post_id = 6,
      user_id = 4,
      content = "🍦👏"
    ),
    Reaction(
      post_id = 8,
      user_id = 4,
      content = "💒🚛"
    ),
    Reaction(
      post_id = 8,
      user_id = 2,
      content = "📵💜"
    ),
    Reaction(
      post_id = 8,
      user_id = 5,
      content = "🍱🍺🤑"
    ),
    Reaction(
      post_id = 9,
      user_id = 1,
      content = "🏞🐣🏙💯"
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
