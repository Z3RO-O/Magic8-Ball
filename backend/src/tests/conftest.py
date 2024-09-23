import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from app.config import Base, get_db  
from app.main import app  

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

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

@pytest.fixture(scope="module")
def client():
    """Create a new FastAPI test client for each test module."""
    def _get_test_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = _get_test_db
    with TestClient(app) as client:
        yield client
