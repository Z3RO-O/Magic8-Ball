from fastapi import FastAPI
from app.config import *
from app.schemas import *
from app.routes import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION
)

# Correctly specifying the frontend origins
origins = [
    "http://localhost:5174",   # Your frontend origin (React app on Vite)
    "http://127.0.0.1:5174",   # Browser might resolve to 127.0.0.1 instead of localhost
]

# Add CORS middleware to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Use full URLs, including scheme (http://)
    allow_credentials=False,
    allow_methods=["*"],    # Allow all HTTP methods
    allow_headers=["*"],    # Allow all headers
)

app.include_router(router)
