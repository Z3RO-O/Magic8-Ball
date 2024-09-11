from fastapi import APIRouter
from app.schemas import Question, Response
from app.crud import get_random_response

router = APIRouter()

# Define the POST endpoint for getting a response
@router.post("/get-response/", response_model=Response)
async def get_response(question: Question):
    print(f"Question: {question.question}")
    random_response = get_random_response()
    return {"question": question.question, "response": random_response}