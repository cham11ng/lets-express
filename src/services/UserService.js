import Boom from 'boom';
import bcrypt from 'bcrypt';
import User from '../models/User';
import auth from '../config/auth';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers() {
  return User.fetchAll({ withRelated: ['posts'] });
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch({ withRelated: ['posts'] }).then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }

    return user;
  });
}

/**
 * Get a user.
 *
 * @param  {Number|String}  email
 * @return {Promise}
 */
export function getUserByEmail(email) {
  return new User({ email }).fetch().then(user => {
    if (!user) {
      return null;
    }

    return user;
  });
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function register(user) {
  return new User({
    name: user.name,
    email: user.email,
    password: bcrypt.hashSync(user.password, parseInt(auth.saltRounds))
  }).save().then(user => user.refresh());
}

/**
 * Login user.
 *
 * @param  {Object}  currentUser
 * @return {Promise}
 */
export function login(currentUser) {
  return getUserByEmail(currentUser.email).then(user => {
    return bcrypt.compareSync(currentUser.password, user.get('password'));
  });
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user) {
  return new User({ id })
    .save({ name: user.name })
    .then(user => user.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}
