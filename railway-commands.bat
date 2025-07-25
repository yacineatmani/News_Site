@echo off
REM Script de gestion Railway pour Windows
REM Usage: railway-commands.bat [commande]

if "%1"=="" goto show_help
if "%1"=="logs" goto show_logs
if "%1"=="reset-db" goto reset_db
if "%1"=="seed-prod" goto seed_prod
if "%1"=="cache-clear" goto cache_clear
if "%1"=="status" goto status
goto show_help

:show_logs
echo 📊 Affichage des logs Railway...
railway logs
goto end

:reset_db
echo 🗄️ Réinitialisation de la base de données...
railway run php artisan migrate:fresh --seed --force
goto end

:seed_prod
echo 🌱 Application du seeder de production...
railway run php artisan db:seed --class=ProductionDataSeeder --force
goto end

:cache_clear
echo 🧹 Nettoyage du cache...
railway run php artisan cache:clear
railway run php artisan config:clear
railway run php artisan route:clear
railway run php artisan view:clear
goto end

:status
echo 📈 Statut du projet Railway...
railway status
goto end

:show_help
echo.
echo 🚄 Commandes Railway - NewsZone
echo ================================
echo.
echo Usage: railway-commands.bat [commande]
echo.
echo Commandes disponibles:
echo   logs        - Afficher les logs
echo   reset-db    - Réinitialiser la base de données
echo   seed-prod   - Appliquer le seeder de production
echo   cache-clear - Nettoyer tous les caches
echo   status      - Afficher le statut du projet
echo.
echo Exemple: railway-commands.bat logs
echo.

:end
