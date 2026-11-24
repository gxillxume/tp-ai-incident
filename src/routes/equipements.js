const equipementsController = require('../controllers/equipementsController')

module.exports = (knex) => {
    const router = require('express').Router();
    const controller = equipementsController(knex);

    router.get('/', controller.list);

    router.post('/', controller.create);

    router.put('/:id', controller.update);
    
    router.delete('/:id', controller.remove);

    return router
}