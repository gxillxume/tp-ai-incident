require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: process.env.DB_FILENAME || './src/db/dev.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds'
    },
    pool: { // active les Foreign Keys
      afterCreate: (conn, done) => {
        conn.pragma('foreign_keys = ON');
        done();
      }
    }
  }
};
