#!/bin/bash

# CivicOne Development Startup Script
# Starts both backend (FastAPI) and frontend (Next.js)

echo "🚀 Starting CivicOne Development Environment"
echo "=============================================="

# Check if running in Git Bash or WSL
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    PYTHON_CMD="python"
else
    PYTHON_CMD="python3"
fi

# Start Backend (FastAPI)
echo ""
echo "📦 Starting Backend (FastAPI on port 8000)..."
cd backend
start cmd //k "uvicorn app.main:app --reload --port 8000"
cd ..

# Wait a moment for backend to initialize
sleep 2

# Start Frontend (Next.js)
echo ""
echo "🎨 Starting Frontend (Next.js on port 9002)..."
cd frontend
start cmd //k "npm run dev"
cd ..

echo ""
echo "✅ Both services are starting!"
echo ""
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:9002"
echo ""
echo "Press Ctrl+C in each terminal window to stop the services."
