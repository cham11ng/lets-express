import env from './env';

export default {
  APP_NAME: env('APP_NAME'),
  APP_ENV: env('APP_ENV'),
  APP_VERSION: env('APP_VERSION'),
  APP_HOST: env('APP_HOST', '0.0.0.0'),
  APP_PORT: env('APP_ENV') === 'test' ? env('TEST_APP_PORT') : env('APP_PORT', '3000'),
  APP_TIMEZONE: 'UTC',
  APP_PAGE_LIMIT: env('APP_PAGE_LIMIT', 10)
};
