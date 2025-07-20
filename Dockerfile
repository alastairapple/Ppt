# Multi-stage build for PPTist web application
# Stage 1: Copy pre-built application
FROM nginx:alpine

# Copy built application (build must be done outside Docker)
COPY dist/ /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]