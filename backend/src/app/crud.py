from langchain.prompts import PromptTemplate
from langchain_community.llms import CTransformers

# Function to get a Magic 8 Ball style response from the Phi-3 model
def getMagic8BallAIResponse(question):
    # Initialize the AI model (Phi-3)
    llm = CTransformers(model='models/Phi-3-mini-4k-instruct-q4.gguf',
                        model_type='phi',
                        config={'max_new_tokens': 75, 'temperature': 0.001})  # Reduced temperature

    # Define the prompt template to generate a Magic 8 Ball style response
    template = """
    You are a Magic 8 Ball that only responds with very short, cryptic answers like "Yes", "No", "Maybe", or "Ask again later". 
    Do not provide any additional text or explanation. 
    Only provide one of these short answers to the question: "{question}"
    """

    prompt = PromptTemplate(input_variables=["question"], template=template)
    
    # Format the prompt with the user's question
    formatted_prompt = prompt.format(question=question)

    # Generate the response using the Phi-3 model
    response = llm.invoke(formatted_prompt)
    print(response)
    return response.strip()
