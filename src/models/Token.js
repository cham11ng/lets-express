import User from './User';
import bookshelf from '../config/database';

const TABLE_NAME = 'tokens';

/**
 * Token model.
 */
class Token extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  user() {
    return this.belongsTo(User);
  }
}

export default Token;
