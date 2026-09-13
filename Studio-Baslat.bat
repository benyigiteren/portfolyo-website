@echo off
title Yigit Eren Studio

echo =======================================================
echo          Y I G I T   E R E N   S T U D I O
echo            Yerel Portfolyo Yonetim Paneli
echo =======================================================
echo(

netstat -ano | findstr :3030 | findstr LISTENING >nul 2>&1
if not errorlevel 1 goto already_running

echo [1/3] Next.js gelistirme sunucusu baslatiliyor (Port 3030)...
if exist .next\BUILD_ID rd /s /q .next >nul 2>&1
start "Yigit Eren Studio Server" /min cmd /c "npm run dev"

echo [2/3] Sunucunun hazir olmasi bekleniyor...
set /a attempt=0

:poll_server
timeout /t 1 /nobreak >nul 2>&1
netstat -ano | findstr :3030 | findstr LISTENING >nul 2>&1
if not errorlevel 1 goto server_ready

set /a attempt+=1
if %attempt% lss 25 (
    <nul set /p=.
    goto poll_server
)

:already_running
echo [1/3] Next.js sunucusu zaten aktif (Port 3030).

:server_ready
echo(
echo [3/3] Studio masaustu penceresi aciliyor...
echo(

if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --app=http://localhost:3030/studio
    goto bitti
)

if exist "C:\Program Files\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files\Microsoft\Edge\Application\msedge.exe" --app=http://localhost:3030/studio
    goto bitti
)

if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --app=http://localhost:3030/studio
    goto bitti
)

if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --app=http://localhost:3030/studio
    goto bitti
)

start "" "http://localhost:3030/studio"

:bitti
echo Studio basariyla acildi!
timeout /t 2 >nul 2>&1
exit
