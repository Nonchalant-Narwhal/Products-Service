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

module.exports.getStyles = async productId => {
  return await db.query(
    'SELECT id AS style_id, name, original_price, sale_price, default_style AS "default?" FROM styles WHERE product_id = $1',
    [productId]
  );
};

module.exports.getPhotos = async styleId => {
  return await db.query(
    'SELECT thumbnail_url, url FROM photos WHERE style_Id = $1',
    [styleId]
  );
};

module.exports.getSkus = async styleId => {
  return await db.query('SELECT * FROM skus WHERE style_id = $1', [styleId]);
};

module.exports.getRelated = async productId =>
  await db.query(
    'SELECT related_product_id FROM related WHERE current_product_id = $1',
    [productId]
  );
