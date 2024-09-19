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
def getMagic8BallAIResponse(question:str,flavour:str):
    # First, randomly choose a predefined response
    random_response = random.choice(dummyResponses)

    # prompt = f"""
    # You are a Magic 8 Ball reader. You have been given the direction: "{random_response}". Now, answer the question in a way that fits this general idea, but keep your response short. 
    # For example, if the question is "Will it rain today?" and the direction is "Outlook good," your response might be "Chances are high, better keep an umbrella handy!"
    # Just give a brief response to the question: "{question}" following the provided direction.
    # """

    # prompt = f"""
    # You are a Magic 8 Ball reader. Your response must strictly follow the style of a Magic 8 Ball. You've been given the direction: "{random_response}". Based on this, answer the question in a way that fits this general idea and stick to the Magic 8 Ball style. No extra explanations or real-world disclaimers. The response must also follow this flavour: "{flavour}", which dictates the tone or style of the answer (e.g., sarcastic, serious, playful).
    # For example, if the question is "Will it rain today?", the direction is "Without a doubt", and the flavour is "Mysterious", your response might be: "Mists gather, whispers of rain loom near. Without a doubt, the sky shall weep."
    # Now, respond to the question: "{question}" based on the provided direction and flavour.
    # """

    # prompt = f"""
    # You are a Magic 8 Ball reader. Your response must strictly follow the style of a Magic 8 Ball. You've been given the direction: "{random_response}". Based on this, answer the question in a way that fits this general idea and stick to the Magic 8 Ball style. No extra explanations or real-world disclaimers. The response must also follow this flavour: "{flavour}", which dictates the tone or style of the answer (e.g., sarcastic, serious, playful). Keep the response between 10-15 words, and avoid unnecessary elaboration.

    # For example, if the question is "Will it rain today?", the direction is "Without a doubt", and the flavour is "Mysterious", your response might be: "Mists gather, whispers of rain loom near. Without a doubt, the sky shall weep."

    # If the question is "What are my chances of getting a parking spot downtown this evening?", the direction is "Surely not", the flavour is "Sophisticated", and the response must include alliteration and the word "magic", your response might be: "Serenely slim, surely not—magic favors those who seek simpler spots elsewhere."

    # Now, respond to the question: "{question}" based on the provided direction and flavour.
    # """

    prompt = f"""
    You are a Magic 8 Ball reader. Respond in the Magic 8 Ball style, following the direction: "{random_response}" and flavour: "{flavour}". Avoide unnecessary details. If the input is not a proper question or is inappropriate, respond with: "Please ask a proper question."

    Respond to the question: "{question}" based on the provided direction and flavour. Keep it under 15 words. Do not explain your response, only return response and nothing else. Also do not worry about giving wrong answer, but always provide an answer.
    """






    res = requests.post('http://ollama:11434/api/generate', json={
        "prompt": prompt,
        "model" : "phi3",
        "stream" : False,
        "temperature": 0.1,   # Controls randomness; lower means more deterministic
        "max_tokens": 10,    # Limits the length of the response
        "top_p": 0.9  
    })

    json_res = res.json()['response']
    
    return json_res