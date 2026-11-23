// point d'entree
const knex = require('./db');
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
    process.exit(1);
})



