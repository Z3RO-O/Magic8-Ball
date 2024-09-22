import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import Base  # Assuming Base is imported from your models configuration

# Test database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# Setup for testing
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db_session():
    """Create a new database session for each test."""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    yield db  # Provide the session to the test
    db.close()
    # Drop all tables after test
    Base.metadata.drop_all(bind=engine)

