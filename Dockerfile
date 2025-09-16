# Stage 1: Build Angular app
FROM node:20-alpine AS builder

WORKDIR /app

# Install build tools for dependencies
RUN apk add --no-cache python3 make g++

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Nginx to serve Angular
FROM nginx:stable-alpine

# Clean default nginx html folder
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build output
COPY --from=builder /app/dist/ticketing-frontend/browser /usr/share/nginx/html


# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
