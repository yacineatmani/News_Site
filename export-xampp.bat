@echo off
echo 🔄 Export des données XAMPP vers Railway
echo.

REM 1. Export de la base XAMPP
echo 📤 Export de la base de données XAMPP...
mysqldump -u root -p news_site > backup_xampp.sql

REM 2. Instructions pour importer sur Railway
echo.
echo ✅ Export terminé dans backup_xampp.sql
echo.
echo 📋 Pour importer sur Railway, utilisez :
echo    railway run --service newssite-production mysql < backup_xampp.sql
echo.
echo 🌐 Ou directement via Railway CLI :
echo    railway login
echo    railway link [your-project-id]
echo    railway run mysql < backup_xampp.sql
echo.
pause
