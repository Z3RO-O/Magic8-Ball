from pydantic import BaseModel

class Question(BaseModel):
    question: str

class Response(BaseModel):
    question: str
    response: str
