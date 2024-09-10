# Use the official Python image.
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY ./requirements.txt /app/requirements.txt

# Install any dependencies
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copy the content of the local src directory to the container at /app
COPY ./src /app

# Command to run the FastAPI application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]