@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-tvg.ps1" %*
if errorlevel 1 (
  echo TVG uzstadisana nav pilniba pabeigta. Skatiet kludas tekstu augstak.
) else (
  echo TVG uzstadisana pabeigta.
)
pause
