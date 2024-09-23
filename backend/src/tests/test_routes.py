import pytest
from fastapi.testclient import TestClient
from app.main import app  # Assuming your FastAPI app is in main.py

def test_root_endpoint(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}


def test_get_history(client):
    response = client.get("/history/")
    assert response.status_code == 200
    # Assuming the history endpoint returns a list of responses
    assert isinstance(response.json(), list)


def test_get_response(client):
    question = "Will it rain tomorrow?"
    flavour = "default"
    response = client.post("/get-response/", json={"question": question, "flavour": flavour})
    assert response.status_code == 200
    json_response = response.json()
    assert "response" in json_response
    assert "id" in json_response


def test_get_response_missing_question(client):
    flavour = "default"
    response = client.post("/get-response/", json={"flavour": flavour})
    assert response.status_code == 422  # Unprocessable Entity


def test_get_response_missing_flavour(client):
    question = "Will it rain tomorrow?"
    response = client.post("/get-response/", json={"question": question})
    assert response.status_code == 422  # Unprocessable Entity


def test_delete_response(client):
    # First, create a response to delete
    question = "Will it rain tomorrow?"
    flavour = "default"
    create_response = client.post("/get-response/", json={"question": question, "flavour": flavour})
    response_id = create_response.json()["id"]

    # Now, delete the response
    response = client.delete(f"/delete-response/{response_id}")
    assert response.status_code == 200
    assert response.json() == {"message": f"Response with ID {response_id} deleted"}


def test_delete_response_not_found(client):
    response_id = 9999  # Assuming this ID does not exist
    response = client.delete(f"/delete-response/{response_id}")
    assert response.status_code == 200
    assert response.json() == {"message": f"Response with ID {response_id} not found"}


def test_delete_all_responses(client):
    response = client.delete("/delete-all-responses/")
    assert response.status_code == 200
    assert response.json() == {"message": "All responses deleted"}