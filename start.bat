@echo off
title HomeAura LAN Server
color 0B

echo =====================================
echo Setting up HomeAura Server...
echo =====================================
echo.

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install it from https://nodejs.org/
    echo.
    pause
    exit /b
)

echo [INFO] Installing required dependencies...
call npm install express socket.io multer

echo.
echo =====================================
echo Starting the Server...
echo =====================================
node server.cjs

pause
