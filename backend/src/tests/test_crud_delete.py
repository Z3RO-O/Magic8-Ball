import pytest
from app.crud import create_response, delete_response, delete_all_responses
from app.models import EightBall
from sqlalchemy.exc import NoResultFound


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


def test_delete_response_nonexistent_id(db_session):
    """Test deleting a response with a non-existent ID."""
    # Attempt to delete a response with an ID that doesn't exist
    non_existent_id = 999  # Assuming this ID doesn't exist in the database

    try:
        delete_response(db_session, non_existent_id)
    except NoResultFound:
        # Expected behavior: no response found with this ID
        pass
    except Exception as e:
        # Any other exception should not occur
        assert False, f"Unexpected exception occurred: {e}"


def test_delete_all_responses_empty(db_session):
    """Test deleting all responses when the database is empty."""
    # Ensure the database is empty
    remaining_responses = db_session.query(EightBall).all()
    assert len(remaining_responses) == 0

    # Call delete_all_responses on an empty database
    delete_all_responses(db_session)

    # Check again to confirm the database is still empty
    remaining_responses_after = db_session.query(EightBall).all()
    assert len(remaining_responses_after) == 0


def test_delete_response_without_id(db_session):
    """Test deleting a response without providing an ID."""
    with pytest.raises(TypeError) as excinfo:
        # Attempt to delete without passing an ID
        delete_response(db_session)
    
    # Ensure the error message is appropriate
    assert "missing 1 required positional argument" in str(excinfo.value)
