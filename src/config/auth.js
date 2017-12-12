import env from './env';

export default {
  saltRounds: env('SALT_ROUNDS', 11),
  accessTokenExpiry: env('ACCESS_TOKEN_DURATION', 300000),
  refreshTokenExpiry: env('REFRESH_TOKEN_DURATION', 86400000),
  accessTokenSalt: env('ACCESS_TOKEN_SALT', 'authenTICaTION'),
  refreshTokenSalt: env('REFRESH_TOKEN_SALT', 'authenTICaTION'),
  forgotPasswordExpiry: env('FORGOT_PASSWORD_TOKEN_DURATION', 300000),
  forgotPasswordSalt: env('FORGOT_PASSWORD_TOKEN_SALT', 'forgotpassword'),
  registerSalt: env('REGISTER_TOKEN_SALT', 'registerUser')
};
