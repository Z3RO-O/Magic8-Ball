from fastapi import APIRouter
from app.schemas import Question
from app.crud import getMagic8BallAIResponse

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Hello World"}

# Define the POST endpoint for getting a response
@router.get("/get-response/")
async def get_response(question: str, flavour: str):
    print(f"Question: {question}")
    print(f"Flavour: {flavour}")
    # Generate response using Phi-3
    response = getMagic8BallAIResponse(question,flavour)
    print(f"response: {response}")
    return {"response": response}
