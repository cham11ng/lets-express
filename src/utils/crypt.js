import bcrypt from 'bcrypt';
import auth from '../config/auth';

/**
 * Create a bcrypt hash for a string.
 *
 * @param {string} string
 * @returns {Promise}
 */
export async function hash(string) {
  let saltRounds = parseInt(auth.saltRounds);

  return await bcrypt.hash(string, saltRounds);
}

/**
 * Compare a string with the hash.
 *
 * @param {string} string
 * @param {string} hash
 * @returns {Promise}
 */
export async function compare(string, hash) {
  return await bcrypt.compare(string, hash);
}
