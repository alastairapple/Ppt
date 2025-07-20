#!/bin/bash

# PPTist Docker Build Script
set -e

echo "🔧 Building PPTist application..."

# Build the application locally (faster and more reliable)
echo "📦 Installing dependencies..."
yarn install

echo "🏗️ Building production assets..."
yarn build

echo "🐳 Building Docker image..."
docker build -t pptist:latest .

echo "✅ Build complete! You can now run:"
echo "   docker run -p 3000:80 pptist:latest"
echo "   or"
echo "   docker compose up pptist"