from fastapi import FastAPI, Response
import requests

app = FastAPI()

@app.get('/')
def home():
    return {"hello" : "World"}

# # Function to get a Magic 8 Ball style response from the Phi-3 model
def getMagic8BallAIResponse(question :str):
    prompt = f"""
    You are a Magic 8 Ball. Respond with a playful and ambiguous answer typical to the nature of a Magic 8 Ball.
    Keep the response limited to 3-5 words. Just be a normal magic 8 ball. Do not repeat any words from the prompt.
    For example: question is "Will I have a good day?" and the response can be "Yes maybe you will".
    Just give a short response to the question: "{question}"
    """
    res = requests.post('http://localhost:11434/api/generate', json={
        "prompt": prompt,
        "stream" : False,
        "model" : "phi3"
    })
    print(res.text)
    return Response(content=res.text, media_type="application/json")