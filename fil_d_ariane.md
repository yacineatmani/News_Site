# Fil d’Ariane du projet CI/CD News_Site

## 1. Clonage du projet
- Cloner le repo GitHub : ✅
  ```bash
  git clone https://github.com/yacineatmani/News_Site.git
  cd News_Site
  ```

## 2. Installation des dépendances
- Backend Laravel : ✅
  ```bash
  composer install
  cp .env.example .env
  php artisan key:generate
  php artisan migrate
  ```
  # Frontend (si présent) : ✅
  ```bash
  npm install
  npm run dev
  ```

## 3. Lancement en local
- Backend : ✅
  ```bash
  php artisan serve
  ```
  # Frontend : ✅
  ```bash
  npm run dev
  ```

## 4. Structure des branches Git
- dev : déploiement Lambda + API Gateway DEV ✅
- staging : déploiement Lambda + API Gateway STAGING ✅
- main : déploiement Lambda + API Gateway PROD ✅

## 5. Infrastructure as Code (Terraform)
- Dossier `terraform/` avec scripts pour :
  - 3 fonctions Lambda (dev, staging, prod) ✅
  - 3 API Gateway ✅
  - 1 bucket S3 ✅
  - Variables d’environnement ✅

## 6. Pipeline CI/CD (GitHub Actions)
- Dossier `.github/workflows/` avec `ci-cd.yml` : ✅
  - Trigger sur push dans chaque branche ✅
  - Checkout, tests, zip, déploiement Lambda via Terraform ✅

## 7. Sécurité
- Clés AWS dans GitHub Secrets ✅
- Budgets AWS activés ✅

## 8. Suivi des coûts AWS
- Console AWS : Billing Dashboard → Free Tier ✅
- CLI : ✅
  ```bash
  aws ce get-cost-and-usage \
    --time-period Start=$(date -d '1 month ago' +%Y-%m-%d),End=$(date +%Y-%m-%d) \
    --granularity MONTHLY \
    --metrics "UsageQuantity" "UnblendedCost"
  ```

## 9. Démo & Documentation
- Schéma d’architecture ✅
- Screenshots du pipeline ✅
- Explication du mapping des branches ✅

---

Ce fichier te guide étape par étape pour réaliser le projet CI/CD multi-environnements avec AWS, Terraform et GitHub Actions.

## 10. Ce qu’il reste à faire (To-Do)

- Ajouter quelques articles et images mock pour enrichir la démo statique sur S3
- Ajouter une page 404 personnalisée pour l’hébergement statique S3
- Automatiser l’upload du build frontend dans Terraform (S3)
- Finaliser la description de l’infra dans Terraform (S3, Lambda, API Gateway, variables)
- (Optionnel) Dockeriser le backend pour usage local/dev/cloud
- Ajouter des captures d’écran et un schéma d’architecture dans la doc
- Optimiser SEO et performance (balises meta, cache, etc.)
- Rédiger un article de blog ou une page portfolio détaillée

---

Ce fichier te guide étape par étape pour réaliser le projet CI/CD multi-environnements avec AWS, Terraform et GitHub Actions, et liste les prochaines étapes pour finaliser et valoriser le projet dans ton portfolio.
