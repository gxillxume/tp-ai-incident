## Pages HTML

Ces routes servent les pages de l'application. Elles ne font pas partie de l'API REST.

| Méthode | URL | Rôle |
| :--- | :--- | :--- |
| `GET` | `/` | Affiche la page d'accueil |
| `GET` | `/equipements` | Affiche la liste des équipements |
| `GET` | `/equipements/nouveau` | Affiche le formulaire d'équipement |
| `GET` | `/equipements/:id/modifier` | Affiche le formulaire de modification |

## API REST
### Équipements

| Méthode | URL | Rôle |
| :--- | :--- | :--- |
| `GET` | `/api/equipements?q=...` | Liste et recherche les équipements |
| `GET` | `/api/equipements/:id` | Récupère un équipement |
| `POST` | `/api/equipements` | Crée un équipement |
| `PUT` | `/api/equipements/:id` | Remplace les données d'un équipement |
| `DELETE` | `/api/equipements/:id` | Supprime un équipement |

### Incidents

| Méthode | URL | Rôle |
| :--- | :--- | :--- |
| `GET` | `/api/incidents?statut=...&priorite=...&categorie=...&equipementId=...` | Liste et filtre les incidents |
| `GET` | `/api/incidents/:id` | Récupère un incident |
| `POST` | `/api/incidents` | Crée un incident |
| `PUT` | `/api/incidents/:id` | Met à jour un incident |
| `DELETE` | `/api/incidents/:id` | Supprime un incident selon la règle de conservation de l'historique |

### Analyses d'incident

| Méthode | URL | Rôle |
| :--- | :--- | :--- |
| `GET` | `/api/incidents/:id/analyses` | Récupère l'historique des analyses d'un incident |
| `POST` | `/api/incidents/:id/analyses` | Crée une analyse avec le choix initial du technicien et le contexte figé |
| `GET` | `/api/analyses/:id` | Récupère une analyse complète |
| `POST` | `/api/analyses/:id/suggestion-ia` | Génère et enregistre la suggestion de l'IA |
| `PUT` | `/api/analyses/:id/decision` | Enregistre la décision finale sans modifier le choix initial |

### Tableau de bord

| Méthode | URL | Rôle |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Retourne les statistiques nécessaires au tableau de bord |

- Les urls de l'api REST retournent que du JSON.
- Les pages les appellent avec fetch

## Service IA :
- **Gemini** (ou autre gratuit)

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
|-- knexfile.js # config knex
|-- package.json
|-- .env
|-- .env.example
|-- .gitignore
|-- README.md # Guide d'installation
|
|-- db/ # fichiers concernants la base de donnée
|    |-- README.md # infos pour la bd (dev)
|    |-- dev.sqlite # bd sqlite
|    |
|    |-- migrations/ # structure de la table
|    |   |-- 20261113181258_equipements.js
|    |   |-- incidents.js # a ajouter
|    |   |-- analyses_tech.js # a ajouter
|    |   |-- analyses_ia.js # a ajouter
|    | 
|    |-- seeds/ # Données de démo
|        |-- equipements.js
|        |-- incidents.js
|        |-- analyses.js
|
|-- src/ # serveur
|   |-- server.js # point d'entrée
|   |-- app.js # configuration Express
|   |
|   |-- routes/ # association URL / méthodes HTTP / contrôleurs
|   |   |-- equipements.js
|   |   |-- incidents.js # à ajouter
|   |   |-- analyses.js # à ajouter
|   |
|   |-- controllers/ # logique et requetes SQLite
|   |    |-- equipementsController.js
|   |    |-- incidentsController.js # à ajouter
|   |    |-- analysesController.js # à ajouter
|   |
|   |-- utils/ # scripts utilitaires
|   |   |-- validate.js # valide les champs des formulaires (serveur)
|   |
|-- frontend/ # client
|   |-- pages/
|   |   |-- index.html
|   |   |-- boilerplate.html # fichier html prêt a etre dupliquer
|   |   |-- equipements/
|   |   |   |-- equipements.html
|   |   |   |-- equipements-form.html
|   |   |
|   |   |-- incidents/ # à ajouter
|   |   |-- analyses/ # à ajouter
|   |   
|   |-- js/ # JavaScript DOM et appels fetch
|       |-- navbar.js # toggle menu et burger
|       |-- equipements/
|       |   |-- equipements.js # recherche + affichage dynamique de la page et des equipements
|       |   |-- form.js # form de creation et modification
|       |
|       |-- incidents/
|       |-- analyses/
|
|-- docs/ # documentation
    |-- model-db.drawio.png
    |-- conception.md
```