import Boom from 'boom';
import auth from '../config/auth';
import Token from '../models/Token';
import * as jwt from 'jsonwebtoken';

/**
 * Get Token
 *
 * @param token
 * @returns {Promise}
 */
export function getToken(token) {
  return new Token({ refresh: token }).fetch()
    .then(token => {
      if (!token) {
        throw Boom.notFound('Tag not found');
      }

      return token;
    });
}

/**
 * Create session
 *
 * @param user
 * @returns {{accessToken: string, refreshToken: string}}
 */
export function createSession(user) {
  let jwTokens = generateTokens({
    id: user.get('id'),
    name: user.get('name'),
    email: user.get('email')
  });
  user.token().save({
    refresh: jwTokens.refreshToken
  });

  return jwTokens;
}

/**
 * Create AccessToken through RefreshToken
 *
 * @param request
 * @returns {Promise<{accessToken: string}>}
 */
export async function createAccessToken(request) {
  try {
    return {
      accessToken: generateAccessToken(request.userInfo)
    };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw Boom.unauthorized('Access Token Expired');
    } else {
      throw Boom.unauthorized('Invalid Access Token');
    }
  }
}

/**
 * Return access and refresh tokens.
 *
 * @param data
 * @returns {{accessToken: string, refreshToken: string}}
 */
export function generateTokens(data) {
  return {
    accessToken: generateAccessToken(data),
    refreshToken: generateRefreshToken(data)
  };
}

/**
 * Return access token.
 *
 * @param data
 * @returns {string}
 */
export function generateAccessToken(data) {
  return jwt.sign({ data }, auth.accessTokenSalt, { expiresIn: parseInt(auth.accessTokenExpiry) });
}

/**
 * Return refresh token.
 *
 * @param data
 * @returns {string}
 */
export function generateRefreshToken(data) {
  return jwt.sign({ data }, auth.refreshTokenSalt, { expiresIn: parseInt(auth.refreshTokenExpiry) });
}

/**
 * Delete Token
 *
 * @param token
 * @returns {Promise}
 */
export function deleteToken(token) {
  return new Token().where({ refresh: token }).destroy({ require: true })
    .then(() => {
      return {
        info: 'Logout Successful'
      };
    }).catch(() => {
      throw Boom.unauthorized('Token Expired');
    });
}
