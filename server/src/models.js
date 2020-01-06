const db = require('./db');

module.exports.getProductList = async (offset, limit) => {
  return await db.query('SELECT * FROM products OFFSET $1 LIMIT $2', [
    offset,
    limit
  ]);
};

module.exports.getProductById = async id => {
  return await db.query('SELECT * FROM products where id = $1', [id]);
};

module.exports.getFeaturesByProductId = async productId => {
  return await db.query(
    'SELECT feature, value FROM features WHERE product_id = $1',
    [productId]
  );
};
