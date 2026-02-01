@echo off
echo.
echo ====================================
echo   Starting Both Apps
echo ====================================
echo.
echo Main App: http://localhost:5173
echo Admin Panel: http://localhost:5174
echo.
echo Opening two terminals...
echo.
start "Our House - Main App" cmd /k "pnpm dev:main"
start "Our House - Admin Panel" cmd /k "pnpm dev:admin"
