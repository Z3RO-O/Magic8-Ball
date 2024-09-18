./bin/ollama serve &

pid=$!

sleep 5

ollama pull phi3

echo "Pulling phi3 model"

wait $pid