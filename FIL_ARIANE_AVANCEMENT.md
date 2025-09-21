# Fil d’Ariane – Avancement Réel du Projet News_Site

## 1. Initialisation du projet
- Création du dépôt et de la structure de dossiers
- Définition du concept : site d’actualités moderne fullstack

## 2. Développement Web
- Développement du frontend (React/Laravel)
- Génération du build statique (frontend_build)
- Vérification du design et des assets (CSS/JS)

## 3. Hébergement Cloud (S3)
- Création du bucket S3 public
- Upload initial des assets/ et index.html
- Correction des chemins d’assets pour le build
- Remplacement de l’index.html minimal par la version portfolio-ready
- Vérification de l’accessibilité publique du site

## 4. Backend Serverless
- Déploiement de l’API articles sur AWS Lambda
- Configuration d’API Gateway pour exposer l’API
- Intégration de l’endpoint API Gateway dans le frontend
- Test de l’appel API depuis le site S3

## 5. Débogage & Corrections
- Correction des liens d’assets manquants sur S3
- Vérification du rendu visuel fidèle au build
- Confirmation que le site est accessible partout et reste gratuit (Free Tier)

## 6. Documentation & Suivi
- Création de ce fil d’Ariane pour retracer toutes les étapes réalisées

---

**Statut actuel :**
- Le site statique portfolio est en ligne sur S3, design fidèle, assets OK
- L’API articles fonctionne via Lambda/API Gateway
- Le projet est prêt à être valorisé dans ton portfolio web/devops/cloud

---

**Prochaines étapes possibles :**
- Automatiser l’infra avec Terraform (dossier terraform/)
- Ajouter une page 404 personnalisée
- Optimiser SEO/performance
- Mettre en place CI/CD
- Documenter chaque étape pour le portfolio

---

Ce fil d’Ariane retrace tout ce qui a été fait jusqu’à présent, étape par étape, pour t’aider à valoriser ce projet dans ton portfolio.
