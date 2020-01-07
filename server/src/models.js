const db = require('./db');

module.exports.getProductList = async (offset, limit) => {
  const client = await db.connect();
  const list = await client
    .query('SELECT * FROM products OFFSET $1 LIMIT $2', [offset, limit])
    .catch(err => {
      client.release();
      throw new Error(err);
    });

  client.release();
  return list;
};

module.exports.getProductById = async id => {
  const client = await db.connect();
  const product = await client
    .query('SELECT * FROM products where id = $1', [id])
    .catch(err => {
      client.release();
      throw new Error(err);
    });

  client.release();
  return product;
};

module.exports.getFeaturesByProductId = async productId => {
  const client = await db.connect();
  const features = await client
    .query('SELECT feature, value FROM features WHERE product_id = $1', [
      productId
    ])
    .catch(err => {
      client.release();
      throw new Error(err);
    });

  client.release();
  return features;
};

module.exports.getStyles = async productId => {
  const client = await db.connect();
  const styles = await client
    .query(
      'SELECT id AS style_id, name, original_price, sale_price, default_style AS "default?" FROM styles WHERE product_id = $1',
      [productId]
    )
    .catch(err => {
      client.release();
      throw new Error(err);
    });

  client.release();
  return styles;
};

module.exports.getPhotos = async styleId => {
  const client = await db.connect();
  const photos = await client
    .query('SELECT thumbnail_url, url FROM photos WHERE style_Id = $1', [
      styleId
    ])
    .catch(err => {
      client.release();
      throw new Error(err);
    });

  client.release();
  return photos;
};

module.exports.getSkus = async styleId => {
  const client = await db.connect();
  const skus = await client
    .query('SELECT * FROM skus WHERE style_id = $1', [styleId])
    .catch(err => {
      client.release();
      throw new Error(err);
    });

  client.release();
  return skus;
};

module.exports.getRelated = async productId => {
  const client = await db.connect();
  const related = await client
    .query(
      'SELECT related_product_id FROM related WHERE current_product_id = $1',
      [productId]
    )
    .catch(err => {
      client.release();
      throw new Error(err);
    });

  client.release();
  return related;
};
