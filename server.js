const express = require('express');
const knex = require('knex')(require('./knexfile').development);

const app = express();

// MIDDLEWARE (fichiers statics)
app.use(express.static('frontend/pages'));
app.use('/js', express.static('frontend/js'));

// ROUTES
// TODO: Ajouter /dashboard, /incidents
app.use('/equipements', require('./routes/equipements')(knex)) // !! Les routes doivent retourner un Router()

// ERREURS
app.use((req,res) => {
    res.status(404).send('<h1>404 - Page non trouvée</h1>')
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Serveur démarré : http://localhost:${process.env.PORT || 3000}`)
})