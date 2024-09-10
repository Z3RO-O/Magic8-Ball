from fastapi import FastAPI
from app.routes import router
from app.config import Base, engine

app = FastAPI()

# For migrating tables to database 
Base.metadata.create_all(bind=engine)

# Register the router from routes.py
app.include_router(router)