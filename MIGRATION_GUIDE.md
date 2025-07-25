# 🔄 Guide Migration XAMPP → Railway

## ⚠️ Problème de compatibilité
- **XAMPP** : MySQL
- **Railway** : PostgreSQL
- Les formats SQL ne sont **PAS compatibles** directement !

## 🛠️ Solutions

### Option 1: Conversion MySQL → PostgreSQL

#### Étape 1: Export MySQL (déjà fait ✅)
```bash
mysqldump -u root news_site > backup_xampp.sql
```

#### Étape 2: Convertir avec un outil
```bash
# Installer mysql2postgres (Python)
pip install mysql-to-postgres

# Convertir
mysql2postgres backup_xampp.sql backup_postgresql.sql
```

#### Étape 3: Import sur Railway
```bash
railway login
railway link [votre-project-id]
railway run psql < backup_postgresql.sql
```

### Option 2: Plus simple - Utiliser les seeders (RECOMMANDÉ ✅)

Au lieu de migrer la base, utilisons nos seeders qui sont déjà compatibles :

```bash
# Sur Railway, réinitialiser avec nos seeders
railway run php artisan migrate:fresh --seed --force
```

### Option 3: Export/Import via interface graphique

1. **Export depuis phpMyAdmin (XAMPP)**
   - Aller sur http://localhost/phpmyadmin
   - Sélectionner `news_site`
   - Onglet "Exporter" → Format SQL

2. **Import via Railway Dashboard**
   - Aller sur railway.app
   - Votre projet → Database → Connect
   - Utiliser un client PostgreSQL pour importer

## 🎯 Recommandation

**Utilisez l'Option 2** (seeders) car :
- ✅ Plus simple
- ✅ Déjà compatible PostgreSQL  
- ✅ Données propres et organisées
- ✅ Pas de conversion nécessaire

## 🚀 Commandes Railway rapides

```bash
# Installer Railway CLI
npm install -g @railway/cli

# Se connecter
railway login

# Lier projet
railway link

# Réinitialiser avec nos seeders
railway run php artisan migrate:fresh --seed --force

# Ou juste le ProductionDataSeeder
railway run php artisan db:seed --class=ProductionDataSeeder --force
```
