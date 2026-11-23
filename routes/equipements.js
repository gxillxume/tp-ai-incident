const express = require('express')

module.exports = (knex) => {
    const router = express.Router();

    // GET + recherche
    router.get('/', async (req, res) => {
        try {
            const q = (req.query.q || '').trim();
            let equipements = knex('equipements').select('*');

            if (q) {
                // WHERE [donnees] LIKE '%[valeur]%' (query builder)
                equipements = equipements.where((builder) => { 
                    builder
                        .where('nom', 'like', `%${q}%`)
                        .orWhere('type', 'like', `%${q}%`)
                        .orWhere('adresse_ip', 'like', `%${q}%`)
                        .orWhere('os', 'like', `%${q}%`)
                        .orWhere('localisation', 'like', `%${q}%`);
                });
            }
            res.json(await equipements);
        } catch (err) {
            console.error('Erreur lors de la récupération des équipements:', err);
            res.status(500).json({ err: 'Erreur serveur' });
        }
    });
    // POST
    router.post('/', async (req,res) => {
        const {nom, type, adresse_ip, os, localisation} = req.body;


    })
    return router
}