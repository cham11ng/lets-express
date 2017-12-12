import Joi from 'joi';
import validate from '../utils/validate';
import * as UserService from '../services/UserService';

const SCHEMA = {
  name: Joi.string()
    .label('Name')
    .max(90)
    .required(),
  email: Joi.string()
    .label('Email')
    .max(90)
    .required(),
  password: Joi.string()
    .label('Password')
    .min(6)
    .max(90)
    .required()
};

const LOGIN_SCHEMA = {
  email: Joi.string()
    .label('Email')
    .max(90)
    .required(),
  password: Joi.string()
    .label('Password')
    .min(6)
    .max(90)
    .required()
};


/**
 * Validate create/update user request.
 *
 * @param  {object}   request
 * @param  {object}   response
 * @param  {function} next
 * @return {Promise}
 */
export function userValidator(request, response, next) {
  return validate(request.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate user login request.
 *
 * @param  {object}   request
 * @param  {object}   response
 * @param  {function} next
 * @return {Promise}
 */
export function loginValidator(request, response, next) {
  return validate(request.body, LOGIN_SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {object}   request
 * @param  {object}   response
 * @param  {function} next
 * @return {Promise}
 */
export function findUser(request, response, next) {
  return UserService
    .getUser(request.params.id)
    .then(() => next())
    .catch(err => next(err));
}
