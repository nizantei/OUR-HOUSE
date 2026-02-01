@echo off
echo.
echo ====================================
echo   Environment Setup
echo ====================================
echo.
echo You need to add your Supabase credentials to .env.local files
echo.
echo Step 1: Get your Supabase credentials
echo   1. Go to: https://app.supabase.com
echo   2. Select your project
echo   3. Click Settings (gear icon in sidebar)
echo   4. Click "API" in settings menu
echo   5. Copy "Project URL" and "anon public" key
echo.
echo Step 2: Update the .env.local files
echo   Files are located at:
echo   - apps/main/.env.local
echo   - apps/admin/.env.local
echo.
pause
echo.
echo Opening .env.local files for you to edit...
notepad "apps\main\.env.local"
notepad "apps\admin\.env.local"
echo.
echo After saving, restart your apps!
echo.
pause
