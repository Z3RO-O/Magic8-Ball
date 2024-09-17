# Backend stage: Use an official Python runtime
FROM python:3.9-slim AS backend

# Set working directory for the backend
WORKDIR /app/backend

# Copy backend requirements and install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Frontend stage: Use the latest Node.js runtime
FROM node:latest AS frontend

# Set working directory for the frontend
WORKDIR /app/frontend

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./

# Clear node_modules and package-lock.json if they exist
RUN rm -rf node_modules package-lock.json

# Install dependencies
RUN npm install

# Copy frontend source code and run the dev server
COPY frontend/ .
COPY frontend/start-frontend.sh .

# Make sure the script has execute permissions
RUN chmod +x start-frontend.sh

# Final stage: Use Python runtime for the final container
FROM python:3.9-slim

# Set working directory for the final stage
WORKDIR /app

# Copy backend from backend stage
COPY --from=backend /app/backend /app/backend

# Copy frontend build from frontend stage
COPY --from=frontend /app/frontend/dist /app/frontend/dist

# Install Ollama
RUN apt-get update && apt-get install -y curl && \
    curl -sSL https://ollama.com/install.sh | sh
