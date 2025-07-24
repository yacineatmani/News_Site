@echo off
echo =======================================
echo   DEMARRAGE SERVEURS SITE NEWS
echo =======================================
echo.

cd /d "c:\Users\MolenGeek\Desktop\Site_news\News_site"

echo [1/3] Verification des dependances...
if not exist "vendor\autoload.php" (
    echo Erreur: Dependances Laravel manquantes. Executez: composer install
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Erreur: Dependances Node manquantes. Executez: npm install
    pause
    exit /b 1
)

echo [2/3] Compilation des assets...
call npm run build

echo [3/3] Demarrage du serveur Laravel...
echo.
echo =======================================
echo   SERVEUR DEMARRE
echo   URL: http://localhost:8000
echo =======================================
echo.
echo Routes disponibles:
echo   /        - Test Laravel simple
echo   /demo    - Demo complete avec layout
echo   /simple  - Test basique layout
echo   /debug   - Diagnostic systeme
echo.
echo Appuyez sur Ctrl+C pour arreter
echo.

php artisan serve --host=127.0.0.1 --port=8000
