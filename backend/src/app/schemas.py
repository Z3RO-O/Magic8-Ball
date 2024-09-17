from pydantic import BaseModel
from typing import Optional

class Question(BaseModel):
    question: str
    flavour: Optional[str] = None

class Response(BaseModel):
    question: str
    response: str