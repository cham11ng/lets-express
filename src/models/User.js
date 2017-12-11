import Post from './Post';
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

  posts() {
    return this.hasMany(Post);
  }
}

export default User;
