const express = require('express');

const ROOT = './frontend/pages'; // chemin des pages html

module.exports = (knex) => {
    const app = express();

    // STATIC
    app.use(express.json());
    app.use(express.static('frontend'));;

    // PAGES
    app.get('/', (req, res) => {
        res.sendFile('index.html', { root: ROOT });
    
    });
    app.get('/equipements', (req, res) => {
        res.sendFile('equipements.html', { root: ROOT });
    });
    app.get('/equipements/nouveau', (req,res) => {
        res.sendFile('equipements-form.html', { root: ROOT });
    })
    app.get('/equipements/:id/modifier', (req, res) => {
        res.sendFile('equipements-form.html', { root: ROOT });
    })

    // API
    app.use('/api/equipements', require('./routes/equipements')(knex))
    
    // 404
    app.use((req,res) => {
        if (req.path.startsWith('/api')) {
            return res.status(404).json({error: 'Route API introuvable'});
        }
        res.status(404).send('<h1">404 - Oops ! Cette page est introuvable.</h1>')
    })

    // ERREURS --> next(err) 
    app.use((err, req, res, _next) => {
        console.error(err);
        const status = err.status || 500;
        if (req.path.startsWith('/api')) {
            return res.status(status).json({ error: err.message || 'Erreur interne du serveur' })
        }
        res.status(status).send(status === 404 ? 
            '<h1>404 - Page non trouvée</h1>' :
            '<h1>Erreur interne du serveur</h1>'
        );
    })

    return app
}
