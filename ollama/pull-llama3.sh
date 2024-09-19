/usr/bin/ollama serve &

pid=$!

sleep 5

echo "Pulling llama3.1:8b model"

ollama pull llama3.1:8b

echo "Pull Completed"

wait $pid