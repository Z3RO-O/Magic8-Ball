# Use Node.js for building the React app
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY  package.json package-lock.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application
COPY . .

# Start application
CMD ["npm", "run", "dev"]
