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
# Créer les données de test
npx knex seed:run
```

## Démarrer (dev) :
```bash
npm run dev 
```

