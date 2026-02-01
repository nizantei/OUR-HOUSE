Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Starting Our House Application" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

Set-Location our-house-app

Write-Host "Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "The app will open at: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run dev
