import { Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as postService from '../services/postService';
import { findPost, editValidator, postValidator } from '../validators/postValidator';

const router = Router();

/**
 * GET /api/posts
 */
router.get('/', (request, response, next) => {
  postService
    .getAllPosts(request.query.page)
    .then(data => response.status(HttpStatus.OK).json({ data: data, pagination: data.pagination }))
    .catch(error => next(error));
});

/**
 * GET /api/posts/:id
 */
router.get('/:id', (request, response, next) => {
  postService
    .getPost(request.params.id)
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * POST /api/posts
 */
router.post('/', postValidator, (request, response, next) => {
  postService
    .createPost(request.body)
    .then(data => response.status(HttpStatus.CREATED).json({ data }))
    .catch(error => next(error));
});

/**
 * PUT /api/posts/:id
 */
router.put('/:id', findPost, editValidator, (request, response, next) => {
  postService
    .updatePost(request.params.id, request.body)
    .then(data => response.status(HttpStatus.OK).json({ data }))
    .catch(error => next(error));
});

/**
 * DELETE /api/posts/:id
 */
router.delete('/:id', findPost, (request, response, next) => {
  postService
    .deletePost(request.params.id)
    .then(data => response.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(error => next(error));
});

export default router;
