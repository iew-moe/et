@echo off
setlocal
set PORT=8000
set ROOT=%~dp0
cd /d "%ROOT%"

echo Starting local server at http://127.0.0.1:%PORT%/
python -m http.server %PORT%
