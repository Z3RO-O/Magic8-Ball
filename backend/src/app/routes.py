from fastapi import APIRouter
from app.schemas import Question, Response
from app.crud import getMagic8BallAIResponse

router = APIRouter()

# Define the POST endpoint for getting a response
@router.post("/get-response/", response_model=Response)
async def get_response(question: Question):
    print(f"Question: {question.question}")
    # Generate response using Phi-3
    ai_response = getMagic8BallAIResponse(question.question)
    print(ai_response, "\nFlavour: ", question.flavour)
    return {"question": question.question, "response": ai_response}