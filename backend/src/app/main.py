from fastapi import FastAPI
from src.app.config import *
from src.app.schemas import *
from src.app.routes import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION
)

# Correctly specifying the frontend origins
origins = [
    "http://localhost",
    "https://localhost",
    "http://localhost:5173",   # Your frontend origin (React app on Vite)
]

# Add CORS middleware to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Use full URLs, including scheme (http://)
    allow_credentials=True,
    allow_methods=["*"],    # Allow all HTTP methods
    allow_headers=["*"],    # Allow all headers
)

app.include_router(router)
