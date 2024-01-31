from app.models import db, CampaignImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_campaign_images():
    image1 = CampaignImage(
        campaign_id=1,
        url="https://img.freepik.com/premium-photo/drone-dark-background_543889-296.jpg",
    )
    image2 = CampaignImage(
        campaign_id=2,
        url="https://www.webstaurantstore.com/images/products/large/234035/1362515.jpg",
    )
    image3 = CampaignImage(
        campaign_id=3,
        url="https://i.pinimg.com/736x/16/0c/19/160c19f51f40baeb7e02bc8f7758720b.jpg",
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)

    db.session.commit()


def undo_campaign_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.campaign_images RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM campaign_images"))

    db.session.commit()
