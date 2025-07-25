#!/bin/bash

# Script de déploiement pour Railway
# Usage: ./deploy-railway.sh [production|staging]

set -e

ENVIRONMENT=${1:-production}

echo "🚀 Déploiement NewsZone - Environnement: $ENVIRONMENT"

# 1. Vérifier que nous sommes sur la branche main
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "❌ Erreur: Vous devez être sur la branche main pour déployer"
    echo "Branche actuelle: $current_branch"
    exit 1
fi

# 2. Vérifier que tout est commité
if ! git diff-index --quiet HEAD --; then
    echo "❌ Erreur: Vous avez des changements non commités"
    echo "Veuillez commiter tous vos changements avant de déployer"
    exit 1
fi

# 3. Pousser vers GitHub
echo "📤 Push vers GitHub..."
git push origin main

echo "✅ Déploiement déclenché!"
echo "🔗 Votre site sera disponible à: https://newssite-production.up.railway.app"
echo "⏱️  Le déploiement prend généralement 2-3 minutes"

# 4. Afficher les commandes utiles pour Railway
echo ""
echo "📋 Commandes utiles pour Railway:"
echo "   - Réinitialiser la DB: railway run php artisan migrate:fresh --seed"
echo "   - Seeder production: railway run php artisan db:seed --class=ProductionDataSeeder"
echo "   - Vider le cache: railway run php artisan cache:clear"
echo "   - Voir les logs: railway logs"
