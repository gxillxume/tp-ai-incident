## Dependances :

```bash
npm install
```
**Installe** : `express`, `knex`, `better-sqlite3`,`dotenv`, `bulma`, `nodemon` (dev)


## Base de donnée :
```bash
# Créer les tables
npx knex migrate:latest
```
```bash
# Réinitialiser et créer les données de test
npx knex seed:run
```

La seed doit être exécutée manuellement. Elle réinitialise les équipements existants.

## Démarrer (dev) :
```bash
npm run dev 
```



