# Build stage
FROM node:18-alpine AS builder

WORKDIR /build

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy all necessary files and maintain directory structure
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/server.js ./
COPY --from=builder /build/db.js ./
COPY --from=builder /build/wishlist ./wishlist/
COPY --from=builder /build/resume ./resume/
COPY --from=builder /build/user ./user/
COPY --from=builder /build/jobs ./jobs/
COPY --from=builder /build/application ./application/

# Expose port 
EXPOSE 8000

# Start command
CMD ["node", "server.js"]