import Joi from 'joi';
import validate from '../utils/validate';
import * as PostService from '../services/PostService';

const SCHEMA = {
  title: Joi.string()
    .label('Title')
    .max(90)
    .required(),
  body: Joi.string()
    .label('Body')
    .max(90)
    .required(),
  userId: Joi.number()
    .integer()
    .label('User')
    .required(),
  tags: Joi.array()
    .items(Joi.number())
    .label('User')
    .required()
};

const EDIT_SCHEMA = {
  title: Joi.string()
    .label('Title')
    .max(90)
    .required(),
  body: Joi.string()
    .label('Body')
    .max(90)
    .required(),
  tags: Joi.array()
    .items(Joi.number())
    .label('User')
    .required()
};


/**
 * Validate create/update post request.
 *
 * @param  {object}   request
 * @param  {object}   response
 * @param  {function} next
 * @return {Promise}
 */
export function postValidator(request, response, next) {
  return validate(request.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate create/update post request.
 *
 * @param  {object}   request
 * @param  {object}   response
 * @param  {function} next
 * @return {Promise}
 */
export function editValidator(request, response, next) {
  return validate(request.body, EDIT_SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate posts existence.
 *
 * @param  {object}   request
 * @param  {object}   response
 * @param  {function} next
 * @return {Promise}
 */
export function findPost(request, response, next) {
  return PostService
    .getPost(request.params.id)
    .then(() => next())
    .catch(err => next(err));
}
