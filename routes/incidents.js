const express = require('express')

module.exports = (knex) => {
    const router = express.Router();
    router.get('/', (req,res) => {
        res.render('pages/incidents');
    });
    return router
}