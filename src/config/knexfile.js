require('babel-register');
require('dotenv').config({ path: __dirname + '/../../.env' });

/**
 * Database configuration.
 */
module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:
      process.env.APP_ENV === 'test'
        ? process.env.TEST_DB_NAME
        : process.env.DB_NAME,
    charset: 'utf8',
    timezone: 'UTC'
  },
  migrations: {
    tableName: 'migrations',
    stub: '../stub/migration.stub',
    directory: '../database/migrations'
  },
  seeds: {
    directory: '../database/seeds',
    stub: '../stub/seed.stub'
  }
};
