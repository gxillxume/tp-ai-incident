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
| `GET` | `/` | Redirection vers `/dashboard` |


## Service IA :
- **Gemini**

## Grille de Prioritées :
| Niveau | Critères | 
| --- | --- |
| **BASSE** | • Affecte 1 seul utilisateur ou poste <br> • Aucune pertes de données<br> • Contournement facile <br> • Impact minimale |
| **MOYENNE** | • Touche un service (mail, VPN, DNS)<br> • Impacte plusieurs utilisateurs <br> • Contournement possible mais peu pratique <br>• Risque d'escalade vers **HAUTE**
| **HAUTE** | • Service critique totalement indisponible (site, bd) <br> • Perte de données <br> • Aucun contournement, nécessite une réponse immédiate |