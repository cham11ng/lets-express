import auth from '../config/auth';
import * as jwt from 'jsonwebtoken';

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
  return jwt.sign({ encryptedData: data }, auth.accessTokenSalt, { expiresIn: auth.accessTokenExpiry });
}

/**
 * Return refresh token.
 *
 * @param data
 * @returns {string}
 */
export function generateRefreshToken(data) {
  return jwt.sign({ encryptedData: data }, auth.refreshTokenSalt, { expiresIn: auth.refreshTokenExpiry });
}

/**
 * Verify access token.
 *
 * @param token
 * @returns {*}
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, auth.accessTokenSalt);
}

/**
 * Verify refresh token.
 *
 * @param token
 * @returns {*}
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, auth.refreshTokenSalt);
}
