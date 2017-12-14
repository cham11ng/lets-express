import Tag from './Tag';
import User from './User';
import bookshelf from '../config/database';

const TABLE_NAME = 'posts';

/**
 * Post model.
 */
class Post extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  user() {
    return this.belongsTo(User);
  }

  tags() {
    return this.belongsToMany(Tag);
  }
}

export default Post;
