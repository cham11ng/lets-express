import Boom from 'boom';
import Tag from '../models/Tag';
import config from '../config/app';

/**
 * Get all tags.
 *
 * @return {Promise}
 */
export function getAllTags(page = 1) {
  return Tag.fetchPage({
    page: page,
    pageSize: config.APP_PAGE_LIMIT
  }).then(results => results);
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
