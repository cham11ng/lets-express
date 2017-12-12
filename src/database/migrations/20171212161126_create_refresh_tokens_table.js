/**
 * Create table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex, Promise) {
  return knex.schema.createTable('tokens', function(table) {
    table.increments();
    table.string('refresh');
    table.integer('user_id').unsigned().notNull().unique();
    table.foreign('user_id').references('users.id');

    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
  });
}

/**
 * Drop table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex, Promise) {
  return knex.schema.dropTable('tokens');
}
