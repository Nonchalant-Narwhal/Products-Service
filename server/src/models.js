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

  const styleList = await client
    .query(
      `select id as style_id, name, original_price, sale_price, default_style as "default?",
          (
            select array_to_json(array_agg(row_to_json(p)))
            from (
              select url, thumbnail_url
              from photos
              where style_id=styles.id
              order by id asc
            ) p
          ) as photos,
        (
            select array_to_json(array_agg(row_to_json(sk)))
            from (
              select size, quantity
              from skus
              where style_id=styles.id
              order by id asc
            ) sk
          ) as skus
        from (SELECT * FROM styles WHERE product_id = $1) as styles     
         `,
      [productId]
    )
    .then(styles => {
      styles = styles.rows;

      styles.forEach(style => {
        if (style.sale_price === 'null') style.sale_price = 0;
        else style.sale_price = Number(style.sale_price);

        const skus = {};
        if (style.skus !== null) {
          style.skus.forEach(sku => (skus[sku.size] = sku.quantity));
        }

        style.skus = skus;
      });

      return styles;
    })
    .catch(err => {
      client.release();
      throw new Error(err);
    });

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
