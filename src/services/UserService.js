import Boom from 'boom';
import bcrypt from 'bcrypt';
import User from '../models/User';
import auth from '../config/auth';
import { createToken, destroyToken } from "./TokenService";

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers() {
  return User.fetchAll({ withRelated: ['posts', 'token'] });
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch({ withRelated: ['posts', 'token'] }).then(user => {
    if (!user) {
      throw Boom.notFound('User not found');
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
      throw Boom.notFound('User not found');
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
  }).save().then((user) => {
    return createToken(user);
  });
}

/**
 * Login user.
 *
 * @param  {Object}  currentUser
 * @return {Promise}
 */
export function login(currentUser) {
  return getUserByEmail(currentUser.email).then(user => {
    if (bcrypt.compareSync(currentUser.password, user.get('password'))) {
      return createToken(user);
    }
  });
}

/**
 * Logout user.
 *
 * @param  token
 */
export function logout(token) {
  return destroyToken(token);
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
  return new User({ id }).fetch().then(user => {
    if (!user) {
      throw Boom.notFound('User not found');
    }

    return user.destroy();
  });
}
