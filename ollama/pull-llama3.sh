#!/bin/bash

MODEL_DIR="/ollama/models"
MODEL_NAME="llama3.1:8b"
MODEL_FILE="$MODEL_DIR/$MODEL_NAME"

# Start ollama serve in the background
/usr/bin/ollama serve &
pid=$!

# Ensure we clean up if the script is interrupted
trap "kill $pid" EXIT

# Give some time for the server to start
sleep 5

# Check if the model is already pulled
if [ ! -f "$MODEL_FILE" ]; then
  echo "Model not found. Pulling $MODEL_NAME..."
  /usr/bin/ollama pull "$MODEL_NAME"
  echo "Pull Completed"
else
  echo "Model $MODEL_NAME already exists. Skipping download."
fi

# Wait for ollama serve process to complete
wait $pid
