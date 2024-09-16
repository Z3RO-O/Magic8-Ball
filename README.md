# Magic 8 Ball

This project is an AI-powered Magic 8 Ball web application. The backend is built using **FastAPI** and the frontend is built using **React**. The application utilizes a language model, specifically **Phi-3-mini-4k-instruct** from **Ollama**, to generate Magic 8 Ball-style responses.

## Features
- Ask the AI-powered Magic 8 Ball any question, and it responds with short, cryptic answers.
- Uses **Ollama's Phi3** model to generate responses.
- Simple UI to input questions and receive AI-generated responses in real-time.

## Architecture
- **Frontend**: Built using **React** and styled with **Tailwind CSS**.
- **Backend**: Built using **FastAPI**, handles API request and communicates with the AI model.
- **AI Model**: The model is served locally using **Ollama**, and integrated with the backend for generating responses.

## Local Setup
### Start Ollama

1. **Start Ollama Server:**
    ```bash
    ollama serve
    ```
2. **Run model:** If you don't have the model in local it will automatically first pull the model and then run it.
    ```bash
    ollama run phi3
    ```

### Start Backend:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Magic8-Ball.git
   cd Magic8-Ball/backend
   ```

2. **Create a virtual environment and install dependencies:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use: venv\Scripts\activate
    pip install -r requirements.txt
    ```

3. **Run the FastAPI server:**
    ```bash
    uvicorn app.main:app --reload
    ```

4. **Test the API:** Open your browser and go to `http://127.0.0.1:8000/docs` to view the automatically generated API documentation.

### Start Frontend:
1. **Navigate to Frontend:**
   ```bash
   cd Magic8-Ball/frontend
   ```

2. **Create a virtual environment and install dependencies:**
    ```bash
    npm i
    ```

3. **Run the Frontend:**
    ```bash
    npm run dev
    ```