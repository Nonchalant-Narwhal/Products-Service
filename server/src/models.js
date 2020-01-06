const db = require('./db');

module.exports.getProductList = async (offset, limit) => {
  return await db.query('SELECT * FROM products OFFSET $1 LIMIT $2', [
    offset,
    limit
  ]);
};
