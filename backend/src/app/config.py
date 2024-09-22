from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@db/magic_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

MAX_QUESTION_LENGTH = 255
MAX_RESPONSE_LENGTH = 1000
MAX_FLAVOUR_LENGTH = 50

# Dependency that will be used to get a database session
def get_db():
   db = SessionLocal()
   try:
      yield db
   finally:
      db.close()