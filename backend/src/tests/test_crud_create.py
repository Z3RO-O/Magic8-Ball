import pytest
from app.crud import create_response
from app.models import EightBall
from app.config import MAX_QUESTION_LENGTH, MAX_RESPONSE_LENGTH, MAX_FLAVOUR_LENGTH


def test_create_duplicate_responses_allowed(db_session):
    """Test that duplicate questions are allowed with unique IDs."""
    question = "Is the sun hot?"
    response1 = "Yes"
    response2 = "Absolutely!"

    # Create the first response
    create_response(db_session, question, response1, "positive")

    # Create a second response with the same question but different response
    create_response(db_session, question, response2, "affirmative")

    # Query the database to check if both responses were created
    results = db_session.query(EightBall).filter(EightBall.question == question).all()
    assert len(results) == 2  # Both responses should be stored
    assert results[0].response == response1
    assert results[1].response == response2


def test_create_response_with_empty_fields(db_session):
    """Test creating a response with empty fields."""
    # Test with an empty question
    with pytest.raises(ValueError):
        create_response(db_session, "", "It is certain", "positive")
    
    # Test with an empty response
    with pytest.raises(ValueError):
        create_response(db_session, "Will it snow?", "", "positive")

    # Test with an empty flavour
    with pytest.raises(ValueError):
        create_response(db_session, "Will I pass the exam?", "Yes", "")


def test_create_response_with_special_characters(db_session):
    """Test creating a response with special characters."""
    question = "Will $@#%*^& happen?"
    response = "Definitely! @#&$%"
    flavour = "normal"

    create_response(db_session, question, response, flavour)

    # Verify that the response is saved correctly
    result = db_session.query(EightBall).filter(EightBall.question == question).first()
    assert result is not None
    assert result.question == question
    assert result.response == response
    assert result.flavour == flavour


def test_create_response_with_long_strings(db_session):
    """Test creating a response with long strings."""
    question = "a" * (MAX_QUESTION_LENGTH + 1)  # Exceeding the limit
    response = "b" * (MAX_RESPONSE_LENGTH + 1)  # Exceeding the limit
    flavour = "positive"

    # Test for question exceeding length
    with pytest.raises(ValueError) as excinfo:
        create_response(db_session, question, "Valid response", flavour)
    assert "Question cannot exceed" in str(excinfo.value)

    # Test for response exceeding length
    with pytest.raises(ValueError) as excinfo:
        create_response(db_session, "Valid question", response, flavour)
    assert "Response cannot exceed" in str(excinfo.value)

    # Test for flavour length
    flavour = "f" * (MAX_FLAVOUR_LENGTH + 1)  # Exceeding the limit
    with pytest.raises(ValueError) as excinfo:
        create_response(db_session, "Valid question", "Valid response", flavour)
    assert "Flavour cannot exceed" in str(excinfo.value)

