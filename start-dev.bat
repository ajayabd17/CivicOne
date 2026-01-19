@echo off
REM CivicOne Development Startup Script (Windows)
REM Starts both backend (FastAPI) and frontend (Next.js)

echo.
echo ========================================
echo Starting CivicOne Development Environment
echo ========================================
echo.

REM Start Backend (FastAPI)
echo Starting Backend (FastAPI on port 8000)...
start "CivicOne Backend" cmd /k "cd /d %~dp0backend && uvicorn app.main:app --reload --port 8000"

REM Wait a moment for backend to initialize
timeout /t 2 /nobreak >nul

REM Start Frontend (Next.js)
echo Starting Frontend (Next.js on port 9002)...
start "CivicOne Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo Both services are starting!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:9002
echo API Docs: http://localhost:8000/docs
echo.
echo Close the terminal windows to stop the services.
echo.
pause
