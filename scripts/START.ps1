Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "   Our House - Quick Start" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Choose what to start:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Main App (User app - port 5173)" -ForegroundColor Green
Write-Host "2. Admin Panel (port 5174)" -ForegroundColor Green
Write-Host "3. Both (Main + Admin)" -ForegroundColor Green
Write-Host ""
$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Starting Main App..." -ForegroundColor Yellow
        Write-Host "URL: http://localhost:5173" -ForegroundColor Cyan
        Write-Host ""
        pnpm dev:main
    }
    "2" {
        Write-Host ""
        Write-Host "Starting Admin Panel..." -ForegroundColor Yellow
        Write-Host "URL: http://localhost:5174" -ForegroundColor Cyan
        Write-Host ""
        pnpm dev:admin
    }
    "3" {
        Write-Host ""
        Write-Host "Starting Both Apps..." -ForegroundColor Yellow
        Write-Host "Main App: http://localhost:5173" -ForegroundColor Cyan
        Write-Host "Admin Panel: http://localhost:5174" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Opening two terminals..." -ForegroundColor Green

        Start-Process pwsh -ArgumentList "-NoExit", "-Command", "pnpm dev:main" -WindowStyle Normal
        Start-Process pwsh -ArgumentList "-NoExit", "-Command", "pnpm dev:admin" -WindowStyle Normal
    }
    default {
        Write-Host "Invalid choice!" -ForegroundColor Red
        pause
    }
}
