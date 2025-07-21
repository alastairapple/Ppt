# Use Node.js 18 as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the built application and server file
COPY dist ./dist
COPY server.js ./

# Expose the port the app runs on
EXPOSE 3000

# Command to serve the built application
CMD ["node", "server.js"]