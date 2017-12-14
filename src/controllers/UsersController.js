import { Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as UserService from '../services/UserService';
import { findUser, userValidator } from '../validators/UserValidator';

const router = Router();

/**
 * GET /api/users
 */
router.get('/', (request, response, next) => {
  UserService
    .getAllUsers()
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * GET /api/users/:id
 */
router.get('/:id', (request, response, next) => {
  UserService
    .getUser(request.params.id)
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * PUT /api/users/:id
 */
router.put('/:id', findUser, userValidator, (request, response, next) => {
  UserService
    .updateUser(request.params.id, request.body)
    .then(data => response.json({ data }))
    .catch(error => next(error));
});

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findUser, (request, response, next) => {
  UserService
    .deleteUser(request.params.id)
    .then(data => response.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(error => next(error));
});

export default router;
