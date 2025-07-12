# Dockerfile for Node.js + TypeScript (ts-node-dev for dev, node for prod)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production=false

# Copy source code
COPY . .

# Build TypeScript (if needed)
RUN npm run build || true

# Expose port
EXPOSE 3000

# Start app (production)
CMD ["npm", "run", "start"]
