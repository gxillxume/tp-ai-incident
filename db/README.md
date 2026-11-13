Creer migration :

**!! Apres avoir installer les dependances (npm install)**
```bash
npx knex migrate:make [nom]
```

Appliquer migration : 
```bash
npx knex migrate:latest
```

Creer une seed (Data de tests) :
```bash
npx knex seed:make [nom]
```

Appliquer seed : 
```bash
npx knex seed:run
```
