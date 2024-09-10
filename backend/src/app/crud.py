from sqlalchemy.orm import Session
from app.models import *
from app.schemas import *

# Create
# def create_notification(db: Session, notification: NotificationCreate):
#     notification = Notification(**notification.model_dump())
#     db.add(notification)
#     db.commit()
#     db.refresh(notification)
#     return notification

