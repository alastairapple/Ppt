# PPTist Docker Setup

This repository now includes Docker configuration for running PPTist in a container environment using only Node.js (no nginx).

## Quick Start

### Using Docker Compose (Recommended)

```bash
# Build and start the application
docker compose up -d

# View logs
docker compose logs -f

# Stop the application
docker compose down
```

The application will be available at http://localhost:3000

### Using Docker directly

```bash
# Build the image
docker build -t pptist .

# Run the container
docker run -d -p 3000:3000 --name pptist-app pptist

# Stop the container
docker stop pptist-app && docker rm pptist-app
```

## Architecture

- **Base Image**: Node.js 18 Alpine (lightweight)
- **Web Server**: Custom Node.js HTTP server using built-in modules
- **No External Dependencies**: No nginx, no additional packages
- **Port**: 3000

## Configuration Changes

The following changes were made to support the Docker setup:

1. **Removed nginx dependency**: The application now runs with a simple Node.js HTTP server
2. **Removed API proxy**: The `/api` proxy configuration in `vite.config.ts` was removed to avoid external redirects
3. **Clean base URL**: SERVER and ASSET URLs have no additional path appended, as requested

## Files Added

- `Dockerfile`: Node.js-only container configuration
- `docker-compose.yml`: Single service composition
- `server.js`: Custom HTTP server using Node.js built-ins
- `.dockerignore`: Optimized build context

## Development

To modify the application:

1. Make your changes to the source code
2. Rebuild the application: `yarn build`
3. Rebuild the Docker image: `docker compose build`
4. Restart: `docker compose up -d`

## Production Deployment

The setup is production-ready with:
- Automatic container restart on failure
- Proper static file serving with correct MIME types
- SPA routing support for Vue.js
- Minimal attack surface (no additional services)