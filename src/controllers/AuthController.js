import { Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as UserService from '../services/UserService';
import * as TokenService from '../services/TokenService';
import { findToken, validateRefreshToken } from '../validators/TokenValidator';
import { isNotAuthenticated, loginValidator, userValidator, userEmailValidator } from '../validators/UserValidator';

const router = Router();

router.post('/email', userEmailValidator, (request, response) => {
  return new Promise(() => {
    response.status(HttpStatus.OK).json({
      info: 'The given email is valid'
    });
  })
});

router.post('/register', userValidator, userEmailValidator, (request, response, next) => {
  UserService
    .register(request.body)
    .then(data => response.status(HttpStatus.CREATED).json({ data }))
    .catch(error => next(error));
});

router.post('/login', isNotAuthenticated, loginValidator, (request, response, next) => {
  UserService
    .login(request.body)
    .then(data => response.status(HttpStatus.CREATED).json(data))
    .catch(error => next(error));
});

router.post('/token', findToken, validateRefreshToken, (request, response, next) => {
  TokenService
    .createAccessToken(request)
    .then(data => response.status(HttpStatus.OK).json(data))
    .catch(error => next(error));
});


router.post('/logout', findToken, validateRefreshToken, (request, response, next) => {
  TokenService
    .deleteToken(request.headers.authorization.substring(7))
    .then(data => response.status(HttpStatus.OK).json(data))
    .catch(error => next(error));
});

export default router;
