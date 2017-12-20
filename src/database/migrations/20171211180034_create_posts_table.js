/**
 * Create posts table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments().primary();
    table.string('title').notNull();
    table.text('body').notNull();
    table.integer('user_id').unsigned().notNull();
    table.foreign('user_id').references('users.id');

    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
  });
}

/**
 * Drop posts table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('posts');
}
