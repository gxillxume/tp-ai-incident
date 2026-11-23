// centralise la connection a la db

const knex = require('knex');
const env = process.env.NODE_ENV || 'development';

module.exports = knex(require('../knexfile')[env]);