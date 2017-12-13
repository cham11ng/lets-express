import { Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as UserService from '../services/UserService';
import { loginValidator, userValidator } from '../validators/UserValidator';

const router = Router();

router.post('/register', userValidator, (request, response, next) => {
  UserService
    .register(request.body)
    .then(data => response.status(HttpStatus.CREATED).json({ data }))
    .catch(error => next(error));
});

router.post('/login', loginValidator, (request, response, next) => {
  UserService
    .login(request.body)
    .then(data => response.status(HttpStatus.CREATED).json(data))
    .catch(error => next(error));
});

router.post('/logout', (request, response, next) => {
  UserService
    .logout(request.headers.authorization.substring(7))
    .then(data => response.status(HttpStatus.OK).json(data))
    .catch(error => next(error));
});

export default router;
