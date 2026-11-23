const express = require('express')

module.exports = (knex) => {
    const router = express.Router();
    router.get('/', async (req, res) => {
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