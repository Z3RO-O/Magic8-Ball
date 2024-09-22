from fastapi import APIRouter, Depends
from app.schemas import *
from app.config import *
from app.crud import *

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Hello World"}

# Get all previous responses
@router.get("/history/")
async def get_history(db: Session = Depends(get_db)):
    return history(db)

# Define the POST endpoint for getting a response
@router.get("/get-response/")
async def get_response(question: str, flavour: str,db: Session = Depends(get_db)):
    print(f"Question: {question}")
    print(f"Flavour: {flavour}")
    # Generate response using Phi-3
    response = getMagic8BallAIResponse(question,flavour)
    print(f"response: {response}")
    # Save the response to the database
    create_response(db, question, response, flavour)
    print(f"Response saved to database")
    return {"response": response}

# Delete a specific response by ID
@router.delete("/delete-response/{response_id}")
async def remove_response(response_id: int, db: Session = Depends(get_db)):
    db_response = delete_response(db, response_id)
    if db_response:
        return {"message": f"Response with ID {response_id} deleted"}
    return {"message": f"Response with ID {response_id} not found"}

# Delete all responses
@router.delete("/delete-all-responses/")
async def remove_all_responses(db: Session = Depends(get_db)):
    delete_all_responses(db)
    return {"message": "All responses deleted"}