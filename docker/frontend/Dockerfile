# Stage 1: Build React app
FROM node:24-alpine AS build

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Set ownership and switch to non-root
RUN chown -R appuser:appgroup /usr/src/app
USER appuser

# Stage 2: Serve with Nginx (read-only root)
FROM nginx:alpine

# Copy build folder
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Use a read-only root filesystem
RUN chmod -R 555 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]