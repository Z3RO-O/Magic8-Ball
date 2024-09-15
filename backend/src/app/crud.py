import ollama

# Function to get a Magic 8 Ball style response from the Phi-3 model
def getMagic8BallAIResponse(question):
    prompt = f"""
    You are a Magic 8 Ball. Respond with a single cryptic answer such as "Yes", "No", "Maybe", "Ask again later", or similar brief phrases.
    Do not provide any additional text or explanation. 
    For example: question is "Will I have a good day?" and the response can be "Yes maybe you will".
    Just give a short response to the question: "{question}"
    """
    response = ollama.generate(model='phi3', prompt=prompt)
    
    # Assuming the response is a dictionary, access the 'response' key
    print(response)
    return response.get('response', 'No response available')