from fastapi import FastAPI, Response
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

# Function to get a Magic 8 Ball style response
def getMagic8BallAIResponse(question:str):
    # First, randomly choose a predefined response
    random_response = random.choice(dummyResponses)

    prompt = f"""
    You are a Magic 8 Ball reader. You have been given the direction: "{random_response}". Now, answer the question in a way that fits this general idea, but keep your response short and human-like, under 20 words. 
    For example, if the question is "Will it rain today?" and the direction is "Outlook good," your response might be "Chances are high, better keep an umbrella handy!"
    Just give a brief response to the question: "{question}" following the provided direction.
    """

    res = requests.post('http://ollama:11434/api/generate', json={
        "prompt": prompt,
        "stream" : False,
        "model" : "phi3"
    })
    
    return Response(content=res.text, media_type="application/json").body


    # prompt = f"""
    # You are a Magic 8 Ball. Respond with a playful and ambiguous answer typical to the nature of a Magic 8 Ball.
    # Keep the response limited to 3-5 words. Just be a normal magic 8 ball. Do not repeat any words from the prompt.
    # For example: question is "Will I have a good day?" and the response can be "Yes maybe you will".
    # Just give a short response to the question: "{question}"
    # """