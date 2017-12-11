import Joi from 'joi';

/**
 * Utility helper for Joi validation.
 *
 * @param  {object}  data
 * @param  {object}  schema
 * @return {Promise}
 */
export default function validate(data, schema) {
  return Joi.validate(data, schema, { abortEarly: false }, err => {
    if (err) {
      return Promise.reject(err);
    }

    return Promise.resolve(null);
  });
}
