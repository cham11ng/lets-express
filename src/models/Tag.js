import Post from './Post';
import bookshelf from '../config/database';

const TABLE_NAME = 'tags';

/**
 * Tag model.
 */
class Tag extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  posts() {
    return this.belongsToMany(Post);
  }
}

export default Tag;
