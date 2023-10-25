from ..models import PostImage, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_post_images():
  post_images = [
    PostImage(url="https://cdn.pixabay.com/photo/2021/04/26/01/39/trees-6207925_1280.jpg", preview=True, post_id=1),
    PostImage(url="https://images.pexels.com/photos/1856455/pexels-photo-1856455.jpeg", preview=False, post_id=1),
    PostImage(url="https://images.pexels.com/photos/2123667/pexels-photo-2123667.jpeg", preview=True, post_id=2),
    PostImage(url="https://images.pexels.com/photos/1985664/pexels-photo-1985664.jpeg", preview=False, post_id=2),
    PostImage(url="https://images.pexels.com/photos/1486243/pexels-photo-1486243.jpeg", preview=True, post_id=3),
    PostImage(url="https://images.pexels.com/photos/2085588/pexels-photo-2085588.jpeg", preview=False, post_id=3),
    PostImage(url="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=2535&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=True, post_id=4),
    PostImage(url="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=2666&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=False, post_id=4),
    PostImage(url="https://images.unsplash.com/photo-1493210977798-4f655ac200a9?auto=format&fit=crop&q=80&w=2504&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=True, post_id=5),
    PostImage(url="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&q=80&w=2535&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=True, post_id=6),
    PostImage(url="https://images.unsplash.com/photo-1635399860495-2a2802a6df5e?auto=format&fit=crop&q=80&w=2535&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=False, post_id=6),
    PostImage(url="https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=True, post_id = 7),
    PostImage(url="https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=False, post_id = 7),
    PostImage(url="https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?auto=format&fit=crop&q=80&w=2160&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=False, post_id = 7),
    PostImage(url="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=True, post_id = 8),
    PostImage(url="https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=True, post_id = 9),
    PostImage(url="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=True, post_id = 10),
    PostImage(url="https://images.unsplash.com/photo-1630857453903-0386bfb0d990?auto=format&fit=crop&q=80&w=2160&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=True, post_id = 11),
    PostImage(url="https://cdn.pixabay.com/photo/2023/01/23/13/37/flowers-7738726_1280.jpg", preview=True, post_id = 12),
    PostImage(url="https://cdn.pixabay.com/photo/2022/08/13/18/25/river-7384240_1280.jpg", preview=True, post_id = 13),
    PostImage(url="https://cdn.pixabay.com/photo/2023/02/16/18/36/coffee-7794531_1280.jpg", preview=True, post_id = 14),
    PostImage(url="https://cdn.pixabay.com/photo/2022/08/29/23/15/mountain-7419960_1280.png", preview=True, post_id = 15),
    PostImage(url="https://cdn.pixabay.com/photo/2017/08/12/10/13/background-2633962_1280.jpg", preview=True, post_id = 16),
    PostImage(url="https://cdn.pixabay.com/photo/2017/09/06/23/01/background-2723434_1280.jpg", preview=False, post_id = 16),
    PostImage(url="https://cdn.pixabay.com/photo/2017/07/03/15/11/background-2468028_1280.jpg", preview=False, post_id = 16),
    PostImage(url="https://cdn.pixabay.com/photo/2016/07/07/01/16/abstract-1501710_1280.jpg", preview=True, post_id = 17),
    PostImage(url="https://cdn.pixabay.com/photo/2016/09/27/19/07/forest-1699079_1280.jpg", preview=True, post_id = 18),
    PostImage(url="https://cdn.pixabay.com/photo/2016/07/17/19/10/background-1524540_1280.jpg", preview=False, post_id=18),
    PostImage(url="https://cdn.pixabay.com/photo/2017/06/08/17/09/background-2384187_1280.jpg", preview=True, post_id = 19),
    PostImage(url="https://cdn.pixabay.com/photo/2018/10/15/17/50/dog-3749561_1280.jpg", preview=True, post_id = 20),
    PostImage(url="https://cdn.pixabay.com/photo/2018/06/25/15/46/tiger-3497203_1280.jpg", preview=False, post_id = 20),
    PostImage(url="https://cdn.pixabay.com/photo/2017/07/15/10/56/bird-hummingbird-2506075_1280.jpg", preview=False, post_id = 20),
    PostImage(url="https://cdn.pixabay.com/photo/2014/03/13/14/20/spiral-286596_1280.jpg", preview=True, post_id = 21),
    PostImage(url="https://cdn.pixabay.com/photo/2023/02/08/08/50/frequency-wave-7776034_1280.jpg", preview = True, post_id = 22),
    PostImage(url="https://cdn.pixabay.com/photo/2019/08/03/04/43/mountain-4381041_1280.png", preview=True, post_id = 23),
    PostImage(url="https://cdn.pixabay.com/photo/2023/10/14/09/20/mountains-8314422_1280.png", preview=False, post_id = 23),
    PostImage(url="https://cdn.pixabay.com/photo/2018/03/28/19/21/easter-3270234_1280.jpg", preview=False, post_id = 23),
    PostImage(url="https://cdn.pixabay.com/photo/2023/09/30/21/16/river-8286407_1280.png", preview=False, post_id = 23),
    PostImage(url="https://cdn.pixabay.com/photo/2022/06/30/23/43/ink-7294678_1280.jpg", preview=True, post_id = 24),
    PostImage(url="https://cdn.pixabay.com/photo/2020/10/04/16/10/space-art-5626853_1280.jpg", preview=True, post_id = 25),
    PostImage(url="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2711&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", preview=False, post_id = 25)
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
