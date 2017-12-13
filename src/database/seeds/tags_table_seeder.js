/**
 * Seed table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('tags')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('tags').insert([
          { name: 'Javascript' },
          { name: 'Node.js' },
          { name: 'express' },
          { name: 'React' },
          { name: 'ES6' },
          { name: 'Vanilla Js' },
          { name: 'Angular.js' },
          { name: 'Vue.js' },
          { name: 'Ember' },
          { name: 'Typescript' },
          { name: 'EcmaScript5' },
          { name: 'EcmaScript6' },
          { name: 'EcmaScript7' },
          { name: 'Webpack' },
          { name: 'Babel' },
          { name: 'Knex' },
          { name: 'bookshelf' }
        ])
      ]);
    });
}
