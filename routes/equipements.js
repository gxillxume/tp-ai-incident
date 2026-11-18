const express = require('express')
const path = require('path')

module.exports = (knex) => {
    const router = express.Router();
    // page
    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/pages/equipements.html'));
    });
    // api
    router.get('/api', async (req, res) => {
        try {
            const equipements = await knex('equipements').select('*');
            res.json(equipements)
        } catch (err) {
            console.error('Erreur lors de la récupération des équipements:', err);
            res.status(500).json({ err: 'Erreur serveur' });
        }
    });
    return router
}