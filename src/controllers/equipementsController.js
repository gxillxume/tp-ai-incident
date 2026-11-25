// Toutes logiques et acces a la bd utiliser dans les routes
const {validate} = require('../utils/validate');
const requiredFields = ['nom', 'type', 'adresse_ip', 'os', 'localisation'] // champs valide



module.exports = (knex) => {    
    const list = async (req, res, next) => {
        try {
            const q = (req.query.q || '').trim();
            let equipements = knex('equipements').select('*');

            if (q) {
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
            next(err);
        }
    };

    const getById = async (req, res, next) => {
        try {
            const equipement = await knex('equipements')
                .where({ id: req.params.id })
                .first();

            if (!equipement) {
                const err = new Error('Équipement introuvable');
                err.status = 404;
                throw err;
            }

            res.json(equipement);
        } catch (err) {
            next(err);
        }
    };

    const create = async (req, res, next) => {
        try {
            const eq = validate(req.body, requiredFields);
            const result = await knex('equipements')
                .insert(eq)
                .returning('*');

            res.status(201).json(result[0]);
        } catch (err) {
            next(err);
        }
    };

    const update = async (req, res, next) => {
        try {
            const eq = validate(req.body, requiredFields);
            const result = await knex('equipements')
                .where({ id: req.params.id })
                .update(eq)
                .returning('*');

            if (result.length === 0) {
                const error = new Error('Équipement introuvable');
                error.status = 404;
                throw error;
            }

            res.json(result[0]);
        } catch (err) {
            next(err);
        }
    };

    const remove = async (req, res, next) => {
        try {
            const deleted = await knex('equipements')
                .where({ id: req.params.id })
                .del();

            if (deleted === 0) {
                const error = new Error('Équipement introuvable');
                error.status = 404;
                throw error;
            }

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    };

    return { list, getById, create, update, remove };
}


