const express = require('express');
const knex = require('knex')(require('./knexfile').development);

const app = express();

// MIDDLEWARE (fichiers statics)
app.use(express.static('frontend/pages'));
app.use('/js', express.static('frontend/js'));

// PAGES
app.get('/equipements', (req, res) => {
    res.sendFile('equipements.html', { root: './frontend/pages' });
});
app.get('/equipements', (req,res) => {
    res.sendFile('equipements-form.html', { root: './frontend/pages' });
})


// API
app.use('/api/equipements', require('./routes/equipements')(knex))

// ERREURS
app.use((req,res) => {
    res.status(404).send('<h1>404 - Page non trouvée</h1>')
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Serveur démarré : http://localhost:${process.env.PORT || 3000}`)
})