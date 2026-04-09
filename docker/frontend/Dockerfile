# Stage 1: Build React app
FROM node:24 AS build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies as root, fix execute permission for CLI scripts
RUN npm ci \
    && chmod -R +x node_modules/.bin

# Copy all source code
COPY . .

# Build the React app
RUN npm run build

# After build
RUN groupadd appgroup && useradd -m -g appgroup appuser && chown -R appuser:appgroup /usr/src/app

USER appuser

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Optional: read-only
RUN chmod -R 555 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]