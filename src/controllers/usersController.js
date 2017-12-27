import { Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as userService from '../services/userService';
import { findUser, userValidator } from '../validators/userValidator';

const router = Router();

/**
 * GET /api/users
 */
router.get('/', (request, response, next) => {
  userService
    .getAllUsers(request.query.page)
    .then(data => response.json({ data: data, pagination: data.pagination }))
    .catch(error => next(error));
});

/**
 * GET /api/users/:id
 */
router.get('/:id', (request, response, next) => {
  userService
    .getUser(request.params.id)
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * PUT /api/users/:id
 */
router.put('/:id', findUser, userValidator, (request, response, next) => {
  userService
    .updateUser(request.params.id, request.body)
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findUser, (request, response, next) => {
  userService
    .deleteUser(request.params.id)
    .then(data => response.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(error => next(error));
});

export default router;
