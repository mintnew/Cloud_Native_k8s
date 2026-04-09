# Stage 1: Build React app
FROM node:24 AS build

WORKDIR /usr/src/app

# Copy package files and install dependencies as root
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build as root
RUN npm run build

# Create non-root user AFTER build
RUN groupadd appgroup && useradd -m -g appgroup appuser \
    && chown -R appuser:appgroup /usr/src/app

# Switch to non-root (optional for further steps)
USER appuser

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html
RUN chmod -R 555 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]