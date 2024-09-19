# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy requirements.txt file and install dependencies
COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application
COPY ./src .

# Command to run the FastAPI app using Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]