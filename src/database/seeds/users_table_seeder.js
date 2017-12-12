import bcrypt from 'bcrypt';
import auth from '../../config/auth';

/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex.schema
    .raw('TRUNCATE users CASCADE')
    .raw('ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    .raw('ALTER SEQUENCE posts_id_seq RESTART WITH 1;')
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert([
          {
            name: 'Sagar Chamling',
            email: 'sgr.raee@gmail.com',
            password: bcrypt.hashSync('secret', parseInt(auth.saltRounds)),
            updated_at: new Date()
          },
          {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: bcrypt.hashSync('silent', parseInt(auth.saltRounds)),
            updated_at: new Date()
          }
        ])
      ]);
    });
}
