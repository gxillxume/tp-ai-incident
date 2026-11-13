const express = require('express');
const knex = require('knex')(require('./knexfile').development);

const app = express();

// MIDDLEWARE (fichiers statics)
app.use(express.static('static'));


// VIEWS (EJS)
app.set('view engine', 'ejs')


// ROUTES
app.use('/dashboard', require('./routes/dashboard')(knex))
app.use('/equipements', require('./routes/equipements')(knex))
app.use('/incidents', require('./routes/incidents')(knex))

// ACCEUIL
app.get('/', (req, res) => {
    res.render('pages/index');
})

// ERREURS
app.use((req,res) => {
    res.status(404).send('<h1>404 - Page non trouvée</h1>')
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Serveur démarré : http://localhost:${process.env.PORT || 3000}`)
})