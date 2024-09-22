from sqlalchemy import Column, DateTime, Integer, String, func
from app.config import Base

class EightBall(Base):
    __tablename__ = "eightball_responses"
    
    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, nullable=False)
    response = Column(String, nullable=False)
    flavour = Column(String, nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

