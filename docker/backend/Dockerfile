# Stage 1: Use lightweight Node.js image
FROM node:24-alpine AS build

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory
WORKDIR /usr/src/app

# Copy only package.json first for caching
COPY package*.json ./

# Install only production dependencies
RUN npm install 

# Copy backend source code
COPY . .

# Change ownership to non-root user
RUN chown -R appuser:appgroup /usr/src/app

# Switch to non-root user
USER appuser

# Expose backend port
EXPOSE 3000

# Start backend
CMD ["node", "index.js"]

