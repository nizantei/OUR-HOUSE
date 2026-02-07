@echo off
echo.
echo ========================================
echo   Our House - Admin Panel
echo ========================================
echo.
echo   Starting...
echo.
echo   Open: http://localhost:5174
echo.
echo ========================================
echo.
cd /d "%~dp0"
pnpm dev:admin
pause
