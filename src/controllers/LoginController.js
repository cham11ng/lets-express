import { Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as UserService from '../services/UserService';
import { loginValidator } from '../validators/UserValidator';

const router = Router();

/**
 * POST /api/users
 */
router.post('/', loginValidator, (request, response, next) => {
  UserService
    .login(request.body)
    .then(data => response.status(HttpStatus.CREATED).json(data))
    .catch(error => next(error));
});

export default router;
