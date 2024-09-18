/usr/bin/ollama serve &

pid=$!

sleep 5

echo "Pulling phi3 model"

ollama pull phi3

echo "Pull Completed"

wait $pid