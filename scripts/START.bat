@echo off
echo.
echo ====================================
echo   Our House - Quick Start
echo ====================================
echo.
echo Choose what to start:
echo.
echo 1. Main App (User app - port 5173)
echo 2. Admin Panel (port 5174)
echo 3. Both (Main + Admin)
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto main
if "%choice%"=="2" goto admin
if "%choice%"=="3" goto both
echo Invalid choice!
pause
exit

:main
echo.
echo Starting Main App...
echo URL: http://localhost:5173
echo.
pnpm dev:main
goto end

:admin
echo.
echo Starting Admin Panel...
echo URL: http://localhost:5174
echo.
pnpm dev:admin
goto end

:both
echo.
echo Starting Both Apps...
echo Main App: http://localhost:5173
echo Admin Panel: http://localhost:5174
echo.
echo Opening two terminals...
start "Our House - Main App" cmd /k "pnpm dev:main"
start "Our House - Admin Panel" cmd /k "pnpm dev:admin"
goto end

:end
