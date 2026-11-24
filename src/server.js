// point d'entree
const env = process.env.NODE_ENV || 'development';
const knex = require('knex')(require('../knexfile')[env]);
const app = require("./app")(knex);

const PORT = process.env.PORT || 3000;


async function main() {
    await knex.migrate.latest();
    app.listen(PORT, () => {
        return console.log(`Serveur démarré : http://localhost:${PORT}`)
    })
}

main().catch((err) => { // catch erreurs de migrations
    console.error('Erreur au démarrage du serveur:', err);
    process.exitCode = 1;
})



