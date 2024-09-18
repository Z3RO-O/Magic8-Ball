from fastapi import APIRouter
from src.app.schemas import Question
from src.app.crud import getMagic8BallAIResponse

router = APIRouter()

# Define the POST endpoint for getting a response
@router.get("/get-response/")
async def get_response(question: str):
    print(f"Question: {question}")
    # Generate response using Phi-3
    ai_response = getMagic8BallAIResponse(question)
    print(f"AI Response: {ai_response}")
    return {"question": question, "response": ai_response}
