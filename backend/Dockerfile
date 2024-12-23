# Build stage
FROM node:18-alpine AS builder

WORKDIR /build

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy all necessary files and maintain directory structure
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/node_modules ./node_modules
COPY . .

# Expose port 
EXPOSE 8000

# Start command
CMD ["node", "server.js"]