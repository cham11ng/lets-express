import Boom from 'boom';
import Tag from '../models/Tag';

/**
 * Get all tags.
 *
 * @return {Promise}
 */
export function getAllTags() {
  return Tag.fetchAll();
}

/**
 * Get a tag.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getTag(id) {
  return new Tag({ id }).fetch({ withRelated: ['posts'] }).then(tag => {
    if (!tag) {
      throw Boom.notFound('Tag not found');
    }

    return tag;
  });
}

/**
 * Create new tag.
 *
 * @param  {Object}  tag
 * @return {Promise}
 */
export function createTag(tag) {
  return new Tag({
    name: tag.name
  }).save().then(tag => tag.refresh());
}

/**
 * Update a tag.
 *
 * @param  {Number|String}  id
 * @param  {Object}         tag
 * @return {Promise}
 */
export function updateTag(id, tag) {
  return new Tag({ id })
    .save({
      name: tag.name
    })
    .then(tag => tag.refresh());
}

/**
 * Delete a tag.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteTag(id) {
  return new Tag({ id }).fetch().then(tag => tag.destroy());
}
