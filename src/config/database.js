import env from './env';
import app from './app';

export default {
  client: env('DB_CLIENT'),
  connection: {
    port: env('DB_PORT'),
    host: env('DB_HOST'),
    user: env('DB_USER'),
    password: env('DB_PASSWORD'),
    database:
      env('NODE_ENV') === 'test'
        ? env('TEST_DB_NAME')
        : env('DB_NAME'),
    charset: 'utf8',
    timezone: app.APP_TIMEZONE
  },
  migrations: {
    tableName: 'migrations'
  }
};
