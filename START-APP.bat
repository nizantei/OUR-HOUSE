@echo off
echo.
echo ========================================
echo   Our House - Main App
echo ========================================
echo.
echo   Starting...
echo.
echo   On this computer:  http://localhost:5173
echo.
echo   On your phone (same WiFi):
echo   1. Open your phone browser
echo   2. Type the Network URL that appears below
echo      (looks like http://192.168.x.x:5173)
echo.
echo ========================================
echo.
cd /d "%~dp0"
pnpm dev:main
pause
