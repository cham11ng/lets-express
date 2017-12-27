import Joi from 'joi';
import validate from '../utils/validate';
import * as tagService from '../services/tagService';

const SCHEMA = {
  name: Joi.string()
    .label('Name')
    .max(90)
    .required(),
};

/**
 * Validate create/update tag request.
 *
 * @param  {object}   request
 * @param  {object}   response
 * @param  {function} next
 * @return {Promise}
 */
export function tagValidator(request, response, next) {
  return validate(request.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate tags existence.
 *
 * @param  {object}   request
 * @param  {object}   response
 * @param  {function} next
 * @return {Promise}
 */
export function findTag(request, response, next) {
  return tagService
    .getTag(request.params.id)
    .then(() => next())
    .catch(err => next(err));
}
