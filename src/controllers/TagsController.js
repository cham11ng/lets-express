import { Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as TagService from '../services/TagService';
import { findTag, tagValidator } from "../validators/TagValidator";

const router = Router();

/**
 * GET /api/tags
 */
router.get('/', (request, response, next) => {
  TagService
    .getAllTags(request.query.page)
    .then(data => response.status(HttpStatus.OK).json({ results: data, pagination: data.pagination }))
    .catch(error => next(error));
});

/**
 * GET /api/tags/:id
 */
router.get('/:id', (request, response, next) => {
  TagService
    .getTag(request.params.id)
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * POST /api/tags
 */
router.post('/', tagValidator, (request, response, next) => {
  TagService
    .createTag(request.body)
    .then(data => response.status(HttpStatus.CREATED).json({ data }))
    .catch(error => next(error));
});

/**
 * PUT /api/tags/:id
 */
router.put('/:id', findTag, tagValidator, (request, response, next) => {
  TagService
    .updateTag(request.params.id, request.body)
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * DELETE /api/tags/:id
 */
router.delete('/:id', findTag, (request, response, next) => {
  TagService
    .deleteTag(request.params.id)
    .then(data => response.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(error => next(error));
});

export default router;
