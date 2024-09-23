from pydantic import BaseModel
from typing import Optional

class Question(BaseModel):
    question: str
    flavour: str

class Response(BaseModel):
    id: int
    question: str
    response: str