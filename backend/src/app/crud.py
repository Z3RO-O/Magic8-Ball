from sqlalchemy.orm import Session
from app.models import *
import requests
import random

# Predefined responses
dummyResponses = [
'It is certain',
'It is decidedly so',
'Without a doubt',
'Yes definitely',
'You may rely on it',
'As I see it, yes',
'Most likely',
'Outlook good',
'Yes',
'Signs point to yes',
'Reply hazy, try again',
'Ask again later',
'Better not tell you now',
'Cannot predict now',
'Concentrate and ask again',
"Don't count on it",
'My reply is no',
'My sources say no',
'Outlook not so good',
'Very doubtful',
]

# Function to get old Question & Responses
def history(db:Session):
    return db.query(EightBall).all()

# Function to get a Magic 8 Ball style response
def getMagic8BallAIResponse(question:str,flavour:str):
    # First, randomly choose a predefined response
    random_response = random.choice(dummyResponses)
    
    # Then, generate a response using the AI model
    prompt = f"""
    You are a Magic 8 Ball reader. Respond in the Magic 8 Ball style, following the direction: "{random_response}" and flavour: "{flavour}". Avoide unnecessary details. If the input is not a proper question or is inappropriate, respond with: "Please ask a proper question."

    Respond to the question: "{question}" based on the provided direction and flavour. Keep it under 15 words. Do not explain your response, only return response and nothing else. Also do not worry about giving wrong answer, but always provide an answer.
    """

    res = requests.post('http://localhost:11434/api/generate', json={
        "prompt": prompt,
        "model" : "llama3.1:8b",
        "stream" : False,
        "temperature": 0.1,   # Controls randomness; lower means more deterministic
        "max_tokens": 10,    # Limits the length of the response
        "top_p": 0.9  
    })

    json_res = res.json()['response']
    # json_res = "Yes"
    return json_res

def create_response(db: Session, question: str, response: str, flavour: str):
    db_response = EightBall(question=question, response=response, flavour=flavour)
    db.add(db_response)
    db.commit()
    db.refresh(db_response)
    print(f"Response created")

# Function to delete a specific response by ID
def delete_response(db: Session, response_id: int):
    db_response = db.query(EightBall).filter(EightBall.id == response_id).first()
    if db_response:
        db.delete(db_response)
        db.commit()
    return db_response

# Function to delete all responses
def delete_all_responses(db: Session):
    db.query(EightBall).delete()
    db.commit()