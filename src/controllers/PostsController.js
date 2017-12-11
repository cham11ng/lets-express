import { Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as PostService from '../services/PostService';
import { findPost, postValidator } from '../validators/PostValidator';

const router = Router();

/**
 * GET /api/posts
 */
router.get('/', (request, response, next) => {
  PostService
    .getAllPosts()
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * GET /api/posts/:id
 */
router.get('/:id', (request, response, next) => {
  PostService
    .getPost(request.params.id)
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * POST /api/posts
 */
router.post('/', postValidator, (request, response, next) => {
  PostService
    .createPost(request.body)
    .then(data => response.status(HttpStatus.CREATED).json({ data }))
    .catch(error => next(error));
});

/**
 * PUT /api/posts/:id
 */
router.put('/:id', findPost, postValidator, (request, response, next) => {
  PostService
    .updatePost(request.params.id, request.body)
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * DELETE /api/posts/:id
 */
router.delete('/:id', findPost, (request, response, next) => {
  PostService
    .deletePost(request.params.id)
    .then(data => response.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(error => next(error));
});

export default router;
