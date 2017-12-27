import { Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as tagService from '../services/tagService';
import { findTag, tagValidator } from '../validators/tagValidator';

const router = Router();

/**
 * GET /api/tags
 */
router.get('/', (request, response, next) => {
  tagService
    .getAllTags(request.query.page)
    .then(data => response.status(HttpStatus.OK).json({ results: data, pagination: data.pagination }))
    .catch(error => next(error));
});

/**
 * GET /api/tags/:id
 */
router.get('/:id', (request, response, next) => {
  tagService
    .getTag(request.params.id)
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * POST /api/tags
 */
router.post('/', tagValidator, (request, response, next) => {
  tagService
    .createTag(request.body)
    .then(data => response.status(HttpStatus.CREATED).json({ data }))
    .catch(error => next(error));
});

/**
 * PUT /api/tags/:id
 */
router.put('/:id', findTag, tagValidator, (request, response, next) => {
  tagService
    .updateTag(request.params.id, request.body)
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * DELETE /api/tags/:id
 */
router.delete('/:id', findTag, (request, response, next) => {
  tagService
    .deleteTag(request.params.id)
    .then(data => response.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(error => next(error));
});

export default router;
