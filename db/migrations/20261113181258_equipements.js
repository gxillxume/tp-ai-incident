/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function(knex) {
  await knex.schema.createTable('equipements', (table) => {
    table.increments('id').primary();
    table.string('nom', 100).notNullable();
    table.string('type', 50).notNullable();
    table.string('adresse_ip', 45).notNullable();
    table.string('os', 50).notNullable();
    table.string('localisation', 100).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('equipements')
};
