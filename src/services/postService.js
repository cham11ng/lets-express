import Boom from 'boom';
import Post from '../models/Post';
import config from '../config/app';

/**
 * Get all posts.
 *
 * @return {Promise}
 */
export function getAllPosts(page = 1) {
  return Post.fetchPage({
    page: page,
    pageSize: config.APP_PAGE_LIMIT
  }).then(collection => collection);
}

/**
 * Get a post.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getPost(id) {
  return new Post({ id }).fetch({ withRelated: ['user', 'tags'] }).then(post => {
    if (!post) {
      throw Boom.notFound('Post not found');
    }

    return post;
  });
}

/**
 * Create new post.
 *
 * @param  {Object}  post
 * @return {Promise}
 */
export function createPost(post) {
  return new Post({
    title: post.title,
    body: post.body,
    userId: post.userId
  }).save().then(result => {
    result.tags().attach(post.tags);

    return result.refresh();
  });
}

/**
 * Update a post.
 *
 * @param  {Number|String}  id
 * @param  {Object}         post
 * @return {Promise}
 */
export function updatePost(id, post) {
  return new Post({ id })
    .save({
      title: post.title,
      body: post.body,
      userId: post.userId
    })
    .then(post => post.refresh());
}

/**
 * Delete a post.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deletePost(id) {
  return new Post({ id }).fetch().then(post => post.destroy());
}
