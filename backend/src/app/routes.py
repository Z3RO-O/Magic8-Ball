from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import *
from app.crud import *
from app.config import get_db

router = APIRouter()

# @router.get("/")
# def read_root():
#     return {"Hello": "World"}

# @router.get("/health")
# def read_item():
#     return {"health status": "ok"}

class QuestionRequest(BaseModel):
    question: str

@router.post("/get-response")
async def get_response(request: QuestionRequest):
    response = generate_response(request.question)
    return {"response": response}
