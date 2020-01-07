const db = require('./db');

module.exports.getProductList = async (offset, limit) => {
  const client = await db.connect();
  const list = await client
    .query('SELECT * FROM products ORDER BY id OFFSET $1 LIMIT $2', [
      offset,
      limit
    ])
    .catch(err => {
      client.release();
      throw new Error(err);
    });

  client.release();
  return list;
};

module.exports.getProductAndFeaturesById = async id => {
  const client = await db.connect();
  const product = await client
    .query('SELECT * FROM products where id = $1', [id])
    .catch(err => {
      client.release();
      throw new Error(err);
    });

  const features = await client
    .query('SELECT feature, value FROM features WHERE product_id = $1', [id])
    .catch(err => {
      client.release();
      throw new Error(err);
    });

  client.release();
  return { product, features };
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

  const styleList = await Promise.all(
    styles.rows.map(async style => {
      const parsedSkus = {};
      const photos = await client
        .query('SELECT thumbnail_url, url FROM photos WHERE style_Id = $1', [
          style.style_id
        ])
        .catch(err => {
          client.release();
          throw new Error(err);
        });

      await client
        .query('SELECT * FROM skus WHERE style_id = $1', [style.style_id])
        .then(skus =>
          skus.rows.forEach(sku => {
            parsedSkus[sku.size] = sku.quantity;
          })
        )
        .catch(err => {
          client.release();
          throw new Error(err);
        });

      if (style.sale_price === 'null') style.sale_price = 0;

      styleInfo = {
        ...style,
        photos: photos.rows,
        skus: parsedSkus
      };

      return styleInfo;
    })
  );

  client.release();
  return styleList;
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
