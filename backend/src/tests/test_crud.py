import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import *
from app.crud import *
from app.config import Base

# Test database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# Setup for testing
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a new session for the test
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

def test_create_response(db_session):
    """Test creating a response."""
    question = "Will it rain today?"
    response = "Yes"
    flavour = "normal"

    # Create a response
    create_response(db_session, question, response, flavour)

    # Query the database to check if the response was created
    result = db_session.query(EightBall).filter(EightBall.question == question).first()

    assert result is not None
    assert result.question == question
    assert result.response == response
    assert result.flavour == flavour

def test_delete_response(db_session):
    """Test deleting a specific response."""
    question = "Will I get a promotion?"
    response = "It is certain"
    flavour = "positive"

    # Create a response
    create_response(db_session, question, response, flavour)

    # Query the database to check if the response was created
    result = db_session.query(EightBall).filter(EightBall.question == question).first()
    assert result is not None

    # Now delete the response
    delete_response(db_session, result.id)

    # Ensure the response is deleted
    result_after_delete = db_session.query(EightBall).filter(EightBall.question == question).first()
    assert result_after_delete is None

def test_delete_all_responses(db_session):
    """Test deleting all responses."""
    # Add multiple responses
    create_response(db_session, "Is the sky blue?", "Yes", "normal")
    create_response(db_session, "Am I lucky?", "Signs point to yes", "positive")
    
    # Check that both responses exist
    all_responses = db_session.query(EightBall).all()
    assert len(all_responses) == 2

    # Now delete all responses
    delete_all_responses(db_session)

    # Ensure all responses are deleted
    remaining_responses = db_session.query(EightBall).all()
    assert len(remaining_responses) == 0

def test_history(db_session):
    """Test retrieving history of responses."""
    # Add a couple of responses
    create_response(db_session, "Will I travel?", "Without a doubt", "positive")
    create_response(db_session, "Will I win the lottery?", "My sources say no", "negative")

    # Retrieve history
    responses_history = history(db_session)

    # Verify that history returns both records
    assert len(responses_history) == 2
    assert responses_history[0].question == "Will I travel?"
    assert responses_history[1].question == "Will I win the lottery?"
