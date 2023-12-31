from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
    User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='User', profile_img="https://creazilla-store.fra1.digitaloceanspaces.com/icons/7915728/user-icon-md.png"),
    User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Smith', profile_img="https://cdnstorage.sendbig.com/unreal/female.webp"),
    User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Jacobs', profile_img="https://images.pexels.com/photos/3482947/pexels-photo-3482947.jpeg"),
    User(
        username='elefan', email='ellie@aa.io', password='password2', first_name='Ellie', last_name='Jacobs', profile_img='https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/boho-elephant-pink-forest-cafe.jpg'
    ),
    User(
        username='rheubarb', email='rheuben@aa.io', password='password3', first_name='Rheuben', last_name='Belheim', profile_img='https://www.alphafoodie.com/wp-content/uploads/2023/03/Rhubarb-and-how-to-freeze-it-square.jpeg'
    ),
    User(
        username='saulophone', email='saulp@gg.com', password='wordpass', first_name="Saul", last_name='Paulson', profile_img='https://i0.wp.com/www.artbyraette.com/wp-content/uploads/2022/06/Every-Little-Movement.jpg?fit=600%2C600&ssl=1'
    )
    ]

    db.session.add_all(users)
    db.session.commit()
    return users


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
