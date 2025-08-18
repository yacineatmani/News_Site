# demo.md – Recette et screenshots pour la démo CI/CD News_Site

## tl;dr
- Ce fichier te guide pour réussir ta démo du projet CI/CD multi-environnements, 100% gratuit AWS.

---

## 1. Préparation
- Vérifie que le projet fonctionne en local (Laravel + npm).
- Installe Terraform et AWS CLI.
- Configure tes clés AWS avec `aws configure`.

## 2. Démo du pipeline CI/CD
- Fais un push sur la branche `dev`, `staging` ou `main`.
- Va sur GitHub → Actions → Observe le workflow `CI/CD Pipeline`.
- Screenshot :
  - ![GitHub Actions en cours](screenshots/github-actions-success.png)

## 3. Démo Terraform
- Dans le dossier `terraform` :
  ```bash
  terraform init
  terraform plan -var="stage=dev"
  terraform apply -var="stage=dev" -auto-approve
  ```
- Screenshot :
  - ![Terraform plan](screenshots/terraform-plan.png)
  - ![Terraform apply](screenshots/terraform-apply.png)

## 4. Démo AWS Console
- Va sur AWS Console → Lambda, API Gateway, S3.
- Vérifie que les ressources ont été créées.
- Screenshot :
  - ![Lambda AWS](screenshots/aws-lambda.png)
  - ![API Gateway AWS](screenshots/aws-apigateway.png)
  - ![S3 AWS](screenshots/aws-s3.png)

## 5. Démo Budget AWS
- Va sur AWS Console → Billing → Budgets.
- Vérifie que le budget « Zero spend » est actif.
- Screenshot :
  - ![Budget AWS](screenshots/aws-budget.png)

## 6. Recette orale pour l’entretien
> « J’ai automatisé le déploiement de mon app Laravel sur AWS Lambda, API Gateway et S3, pour trois environnements, avec Terraform et GitHub Actions. J’ai sécurisé les accès, surveillé les coûts, et documenté chaque étape pour garantir la reproductibilité et la maîtrise du cloud AWS. »

---

## Astuce
- Ajoute tes propres captures d’écran dans le dossier `screenshots/` pour illustrer chaque étape.
- Personnalise la recette selon ton workflow et ton projet.

---

Ce fichier t’aide à réussir ta démo et à valoriser ton projet DevOps !
