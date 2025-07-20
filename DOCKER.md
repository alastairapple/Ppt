# Docker Setup for PPTist

This directory contains Docker configuration files to containerize and deploy the PPTist web presentation application.

## Quick Start

### Option 1: Using the build script (Recommended)
```bash
./build.sh
```

### Option 2: Manual build and run
```bash
# Build the application locally first
yarn install
yarn build

# Build and run the Docker container
docker build -t pptist:latest .
docker run -p 3000:80 pptist:latest
```

### Option 3: Using Docker Compose
```bash
# Build locally first
yarn build

# Run with docker compose
docker compose up pptist
```

The application will be available at http://localhost:3000

## Files Description

### Production Files
- **`Dockerfile`** - Main production Dockerfile (requires local build)
- **`nginx.conf`** - Nginx configuration for serving the application
- **`docker-compose.yml`** - Docker Compose configuration
- **`.dockerignore`** - Files to exclude from Docker build context

### Development Files
- **`Dockerfile.dev`** - Development container with hot reload
- **`Dockerfile.multistage`** - Alternative Dockerfile that builds inside Docker

### Scripts
- **`build.sh`** - Automated build script

## Docker Images

### Production Image (Recommended)
The main Dockerfile creates a lightweight production image:
- **Base**: nginx:alpine (~40MB)
- **Strategy**: Copy pre-built dist/ folder
- **Advantages**: Fast builds, smaller image, reliable
- **Requirements**: Run `yarn build` locally first

### Multi-stage Image (Alternative)
The Dockerfile.multistage builds everything inside Docker:
- **Base**: node:20-alpine + nginx:alpine
- **Strategy**: Build inside Docker, then copy to nginx
- **Advantages**: No local Node.js required
- **Disadvantages**: Slower builds, larger intermediate images

## Development Workflow

### Development Container
```bash
# Build and run development container
docker build -f Dockerfile.dev -t pptist:dev .
docker run -p 5173:5173 -v $(pwd):/app pptist:dev

# Or with docker compose
docker compose --profile dev up pptist-dev
```

The development server will be available at http://localhost:5173 with hot reload.

## Deployment

### Basic Deployment
```bash
# Build and run production container
./build.sh
docker run -d -p 80:80 --name pptist-prod pptist:latest
```

### Docker Compose Deployment
```bash
# Update docker-compose.yml ports as needed
docker compose up -d pptist
```

### Environment Variables
The nginx configuration can be customized by mounting your own `nginx.conf`:
```bash
docker run -p 3000:80 -v ./custom-nginx.conf:/etc/nginx/nginx.conf pptist:latest
```

## Customization

### API Backend
The application includes a placeholder for API proxy configuration in `nginx.conf`. 
To enable API backend:

1. Uncomment the `/api/` location block in `nginx.conf`
2. Update the `proxy_pass` URL to your backend server
3. Rebuild the Docker image

### Nginx Configuration
Modify `nginx.conf` to:
- Change port configuration
- Add SSL/TLS setup
- Configure additional proxy rules
- Adjust caching headers

## Troubleshooting

### Build Issues
- Ensure `yarn build` completes successfully before building Docker image
- Check that `dist/` folder exists and contains built files
- Verify Node.js version compatibility (requires Node 20+)

### Runtime Issues
- Check container logs: `docker logs <container-name>`
- Verify port mappings: `docker port <container-name>`
- Test nginx configuration: `docker exec <container-name> nginx -t`

### Performance
- The application bundle is ~3MB compressed
- Consider implementing code splitting for larger deployments
- Use a CDN for static assets in production

## Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Local Build   │    │  Docker Image   │
│                 │    │                 │
│  yarn install   │────│   nginx:alpine  │
│  yarn build     │    │   + dist/       │
│  → dist/        │    │   + nginx.conf  │
└─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Container     │
                       │                 │
                       │  nginx serves   │
                       │  static files   │
                       │  on port 80     │
                       └─────────────────┘
```

## Security Notes

- The container runs nginx as non-root user
- Static files only - no server-side code execution
- Consider adding security headers in production
- API proxy is disabled by default - enable only if needed

## License

This Docker configuration follows the same license as the main PPTist project.