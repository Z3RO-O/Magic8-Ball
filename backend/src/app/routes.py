from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import Question, Response
from app.config import get_db
from app.crud import create_response, delete_response, delete_all_responses, getMagic8BallAIResponse, history

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Hello World"}

# Get all previous responses
@router.get("/history/")
async def get_history(db: Session = Depends(get_db)):
    return history(db)

# Define the POST endpoint for getting a response
@router.post("/get-response/", response_model=Response)
async def get_response(question: Question, db: Session = Depends(get_db)):
    print(f"Question: {question.question}")
    print(f"Flavour: {question.flavour}")
    
    # Generate response using Phi-3
    response_text = getMagic8BallAIResponse(question.question, question.flavour)
    print(f"response: {response_text}")
    
    # Save the response to the database and get the ID
    response_id = create_response(db, question.question, response_text, question.flavour)
    print(f"Response saved to database with ID: {response_id}")
    
    return Response(id=response_id,question=question.question, response=response_text)  # Return both response and ID

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