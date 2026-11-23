const express = require('express')

module.exports = (knex) => {
    const router = express.Router();

    // GET + recherche
    router.get('/', async (req, res, next) => {
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
            next(err)
        }
    });
    // POST
    router.post('/', async (req,res,next) => {
        try {

        } catch (err) {
            const {nom, type, adresse_ip, os, localisation} = req.body;
        }
        


    })
    return router
}