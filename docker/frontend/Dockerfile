# Stage 1: Build React app
FROM node:24 AS build

WORKDIR /usr/src/app

# Copy package.json and install deps
COPY package*.json ./
RUN npm ci \
    && chmod -R 755 node_modules/.bin   # Fix execute permissions

# Copy all source code
COPY . .

# Build React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Optional: make files read-only
RUN chmod -R 555 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]