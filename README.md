# News_Site – Synthèse Projet DevOps & Cloud

## ✅ Ce qui a déjà été fait
- Développement frontend (React/Laravel), build statique généré
- Déploiement du site statique sur AWS S3 (public, portfolio-ready)
- Upload des assets et correction des chemins
- Backend API articles déployé sur AWS Lambda + API Gateway
- Intégration de l’API dans le frontend (affichage dynamique d’articles)
- Pipeline CI/CD GitHub Actions (déploiement auto sur push dev/staging/main)
- Suivi des coûts AWS (budget, alertes)
- Documentation, seeders, et comptes de test Railway (voir RAILWAY_STATUS.md)

## ⏳ Ce qu’il reste à faire (recommandé)
- Ajouter quelques articles/images mock pour enrichir la démo statique
- Ajouter une page 404 personnalisée pour S3
- Automatiser toute l’infra avec Terraform (S3, Lambda, API Gateway)
- (Optionnel) Dockeriser le backend pour la suite (local/dev/cloud)
- Ajouter des captures d’écran et un schéma d’architecture dans ce README
- Optimiser SEO et performance (balises meta, cache, etc.)
- Rédiger un article de blog ou une page portfolio détaillée

## Schéma d’architecture (à compléter)
```
GitHub → GitHub Actions → AWS Lambda (dev/staging/prod) → API Gateway → S3 (statique)
```

## Commandes utiles
```bash
# Terraform
cd terraform
terraform init
terraform plan -var="stage=dev"
terraform apply -var="stage=dev" -auto-approve

# Railway (prod)
railway status
railway logs --follow
railway run php artisan db:seed --class=ProductionDataSeeder --force
```

## Liens utiles
- Site statique S3 : [à compléter]
- API Gateway : [à compléter]
- Railway prod : https://newssite-production.up.railway.app
- Railway dashboard : https://railway.app/project/pleasant-stillness

---

**Ce README synthétise l’avancement, les prochaines étapes et les commandes clés du projet. Utilise-le comme référence unique pour ton portfolio DevOps/cloud.**
