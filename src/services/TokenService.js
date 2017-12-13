import { generateTokens, verifyRefreshToken } from '../utils/jwt';
import Token from '../models/Token';
import Boom from 'boom';

/**
 * Create token
 *
 * @param user
 * @returns {{accessToken: string, refreshToken: string}}
 */
export function createToken(user) {
  let jwt = generateTokens(user.refresh());
  user.token().save({
    refresh: jwt.refreshToken
  });

  return jwt;
}

/**
 * Destroy token
 *
 * @param token
 */
export async function destroyToken(token) {
  try {
    if (await verifyRefreshToken(token)) {
      deleteToken(token);

      return true;
    }
  } catch(error) {
    if (error.name === 'TokenExpiredError') {
      deleteToken(token);
      throw Boom.unauthorized('Token Expired');
    }
    throw Boom.unauthorized('Invalid Token');
  }
}

/**
 * Delete a token.
 *
 * @param  {Number|String}  token
 */
export function deleteToken(token) {
  return new Token({ refresh: token })
    .fetch()
    .then(token => token ? token.destroy() : null);
}
