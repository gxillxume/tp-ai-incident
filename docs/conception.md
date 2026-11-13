## Routes :

| Méthode | URL | Rôle
| :--- | :--- | :--- |
| `GET` | `/equipements` | Liste les equipements + recherche | aucun |
| `GET` | `/equipements/nouveau` | Formulaire de creation
| `POST` | `/equipements/nouveau` | Créer un equipement
| `GET` | `/equipements/:id/modifier` | formulaire de modification
| `PUT` | `/equipements/:id` | Met a jours un equipement
| `DELETE` | `/equipements/:id` | Supprimer un equipement
| `GET` | `/incidents` | Liste des incidents + filtres() |
| `GET` | `/incidents/nouveau` | Affiche le formulaire de création |
| `POST` | `/incidents` | Crée un incident |
| `GET` | `/incidents/:id` | Détail d'un incident + zone analyse IA |
| `GET` | `/incidents/:id/modifier` | Affiche le formulaire d'édition |
| `PUT` | `/incidents/:id` | Met à jour un incident |
| `DELETE` | `/incidents/:id` | Supprime un incident |
| `POST` | `/incidents/:id/analyse-technicien` | Enregistre le choix initial (catégorie + priorité + justification + contexte figé) |
| `POST` | `/analyses-technicien/:id/analyser-ia` | Appelle l'API IA et enregistre la réponse |
| `POST` | `/analyses-ia/:id/decision` | Enregistre la décision finale (sans écraser le choix initial) |
| `GET` | `/incidents/:id/historique` | Affiche l'historique des analyses |
| `GET` | `/dashboard` | Vue agrégée (stats + graphique Chart.js) |
| `GET` | `/` | Redirection vers `/dashboard` ou Page d'acceuil (a voir) |


## Service IA :
- **Gemini**

## Grille de Prioritées :
| Niveau | Critères | 
| --- | --- |
| **BASSE** | • Affecte 1 seul utilisateur ou poste <br> • Aucune pertes de données<br> • Contournement facile <br> • Impact minimale |
| **MOYENNE** | • Touche un service (mail, VPN, DNS)<br> • Impacte plusieurs utilisateurs <br> • Contournement possible mais peu pratique <br>• Risque d'escalade vers **HAUTE**
| **HAUTE** | • Service critique totalement indisponible (site, bd) <br> • Perte de données <br> • Aucun contournement, nécessite une réponse immédiate |


## Organisation du code :
```
tp-ai-incident/
|
|-- server.js 
|-- knexfile.js # config knex (utilisée par server.js)
|-- package.json
|-- .env
|-- .env.example
|-- .gitignore
|-- README.md # Guide d'installation
|
|-- db/ # fichiers concernants la base de donnée
|    |-- README.md # infos pour la bd (dev)
|    |-- dev.sqlite # bd sqlite (generer auto)
|    |-- migrations/ # structure de la table
|    |   |-- equipements.js
|    |   |-- incidents.js # a ajouter
|    |   |-- analyses_tech.js # a ajouter (plus tard)
|    |   |-- analyses_ia.js # a ajouter (plus tard)
|    |-- seeds/ # Données de démo
|        |-- equipements.js
|        |-- incidents.js # a ajouter
|
|-- routes/ TODO: Ajouter analyse ai et historique
|   |-- equipements.js
|   |-- incidents.js
|   |-- dashboard.js
|   
|-- views/ # presentation (ejs)
|   |-- layouts/ # squelette (head, navbar)
|   |   |-- head.ejs
|   |   |-- header.ejs
|   |-- pages/ # utilisent tous /layouts
|       |-- dashboard.ejs
|       |-- equipements.ejs
|       |-- incidents.ejs
|       |-- index.ejs
|
|-- static/ # fichiers statics (img, css, js)
|   |-- css/
|
|-- docs/ # documentation
    |-- model-db.drawio.png
    |-- conception.md
```