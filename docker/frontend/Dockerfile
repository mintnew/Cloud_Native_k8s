# Stage 1: Build React app
FROM node:24-bullseye-slim AS build

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build React app via npx
RUN npx react-scripts build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Make files read-only
RUN chmod -R 555 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]