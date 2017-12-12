import Post from './Post';
import Token from './Token';
import bookshelf from '../config/database';

const TABLE_NAME = 'users';

/**
 * User model.
 */
class User extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  token() {
    return this.hasOne(Token);
  }

  posts() {
    return this.hasMany(Post);
  }
}

export default User;
