/**
 * Create table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex, Promise) {
  return knex.schema.createTable('tags', function(table) {
    table.increments().primary();
    table.string('name');
  }).createTable('posts_tags', function(table) {
    table.integer('post_id').unsigned().notNull();
    table.foreign('post_id').references('posts.id');
    table.integer('tag_id').unsigned().notNull();
    table.foreign('tag_id').references('tags.id');
  });
}

/**
 * Drop table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex, Promise) {
  return knex.schema.dropTable('posts_tags').dropTable('tags');
}
