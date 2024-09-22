from app.crud import create_response, history


def test_history_empty(db_session):
    """Test retrieving history when there are no responses."""
    # Retrieve history from an empty database
    responses_history = history(db_session)

    # Verify that the history is empty
    assert len(responses_history) == 0
    

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
