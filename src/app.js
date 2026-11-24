const express = require('express');

module.exports = (knex) => {
    const app = express();

    // STATIC
    app.use(express.json());
    app.use(express.static('frontend'));;

    // PAGES
    app.get('/', (req, res) => {
        res.sendFile('index.html', { root: './frontend/pages' });
    });
    app.get('/equipements', (req, res) => {
        res.sendFile('equipements.html', { root: './frontend/pages' });
    });
    app.get('/equipements/nouveau', (req,res) => {
        res.sendFile('equipements-form.html', { root: './frontend/pages' });
    })

    // API
    app.use('/api/equipements', require('./routes/equipements')(knex))
    
    // ERREURS 
    app.use((err, req, res, next) => {
        console.error(err);
        if (req.path.startsWith('/api')) {
            return res.status(err.status || 500).json({ error: err.message || 'Erreur interne du serveur' })
        }
        res.status(404).send('<h1>404 - Page non trouvée</h1>');
    })

    return app
}
