# Démo & Documentation CI/CD News_Site

## tl;dr
- Pipeline CI/CD complet, multi-environnements, 100% gratuit (Always Free AWS).
- Déploiement auto sur Lambda + API Gateway + S3 à chaque push sur dev, staging, main.
- Suivi des coûts et alertes budget pour éviter toute dépense.

---

## Schéma d’architecture
```
GitHub → GitHub Actions → AWS Lambda (dev/staging/prod) → API Gateway → S3
```

## Commandes Terraform principales
```bash
cd terraform
terraform init
terraform plan -var="stage=dev"
terraform apply -var="stage=dev" -auto-approve
```

## Mapping des branches
- `dev` → déploiement Lambda + API Gateway DEV
- `staging` → déploiement Lambda + API Gateway STAGING
- `main` → déploiement Lambda + API Gateway PROD

## Pipeline CI/CD (GitHub Actions)
- Fichier : `.github/workflows/ci-cd.yml`
- À chaque push sur dev, staging ou main :
	- Build, tests, zip
	- Déploiement sur AWS via Terraform

## Sécurité
- Clés AWS stockées dans GitHub Secrets
- Budget AWS activé (alerte dès 0 $ de dépense)

## Screenshots
- Ajoute ici des captures d’écran du pipeline en action (GitHub Actions, AWS Console, alertes budget…)

## Vérification du Free Tier
- Console AWS : Billing → Free Tier → Always Free
- Alertes email dès que le budget est dépassé

---

Ce projet est prêt à être cloné, testé et enrichi pour ton portfolio DevOps !
# Railway deployment trigger
# Force redeploy for email config
