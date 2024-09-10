from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class NotificationType(str, Enum):
    EMAIL = "email"
    SMS = "sms"
    PUSH = "push"
class NotificationCreate(BaseModel):
    user_id: int
    from_service: str
    title: str
    message: str
    notification_type: str

class NotificationReadLogCreate(BaseModel):
    notification_id: int
    user_id: int

class NotificationUpdate(BaseModel):
    read: bool
    read_at: Optional[datetime]

class NotificationRead(BaseModel):
    id: int
    from_service: str
    user_id: int
    title: str
    message: str
    created_at: datetime
    read: bool
    read_at: Optional[datetime]
    notification_type: NotificationType

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    name: str
    email: str
