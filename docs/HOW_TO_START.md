# How to Start Our House

## Quick Start (Double-click to run)

### Option 1: Windows Batch File
**Double-click:** `START.bat`

### Option 2: PowerShell Script
**Right-click:** `START.ps1` → **Run with PowerShell**

---

## What These Scripts Do

1. Navigate to the app folder
2. Start the development server
3. Open http://localhost:5173 in your browser

---

## Manual Start (If Scripts Don't Work)

1. Open **Command Prompt** or **PowerShell**

2. Run these commands:
   ```bash
   cd "C:\Users\nitsa\OneDrive\Desktop\OUR HOUSE\our-house-app"
   npm run dev
   ```

3. Open browser to: http://localhost:5173

---

## To Stop the Server

Press **Ctrl+C** in the terminal window

---

## Troubleshooting

**"npm is not recognized"**
- Make sure Node.js is installed
- Restart your terminal/computer after installing Node.js

**Port 5173 already in use**
- Close any other terminal windows running the app
- Or the script will suggest a different port automatically

**PowerShell script won't run**
- Right-click `START.ps1` → Run with PowerShell
- Or in PowerShell, type: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
