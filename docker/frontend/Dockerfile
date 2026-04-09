# Stage 1: Build React app
FROM node:24 AS build

# Create non-root user (Debian syntax)
RUN groupadd appgroup && useradd -m -g appgroup appuser

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Set ownership and switch to non-root
RUN chown -R appuser:appgroup /usr/src/app
USER appuser

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Optional: make files read-only
RUN chmod -R 555 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]