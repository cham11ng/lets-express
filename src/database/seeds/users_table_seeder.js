/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert([
          {
            name: 'Sagar Chamling',
            updated_at: new Date()
          },
          {
            name: 'John Doe',
            updated_at: new Date()
          }
        ])
      ]);
    });
}
