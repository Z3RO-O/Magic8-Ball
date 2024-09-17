#!/bin/sh
# Remove node_modules and package-lock.json
echo "Cleaning up node_modules and package-lock.json"
# rm -rf node_modules package-lock.json

# Install dependencies
echo "Installing dependencies"
# npm install

# Run the development server
echo "Starting development server"
npm run dev -- --host 0.0.0.0
