const models = require('./models');

module.exports.getProductList = async (page, count) => {
  page = page === undefined ? 1 : page;
  count = count === undefined ? 5 : count;

  const productList = await models.getProductList((page - 1) * count, count);

  return productList.rows;
};

module.exports.getProductInfoById = async id => {
  const product = await models.getProductById(id);
  const features = await models.getFeaturesByProductId(id);

  productInfo = product.rows[0];
  productInfo.features = [];
  features.rows.forEach(feature => productInfo.features.push(feature));
  return productInfo;
};

module.exports.getStyles = async productId => {
  const styleInfo = { product_id: Number(productId) };
  let styles = await models.getStyles(productId).then(results => results.rows);

  styles = await Promise.all(
    styles.map(async style => {
      const parsedSkus = {};
      const photos = await models.getPhotos(style.style_id);
      await models.getSkus(style.style_id).then(skus => {
        return skus.rows.forEach(sku => (parsedSkus[sku.size] = sku.quantity));
      });

      if (style.sale_price === 'null') style.sale_price = 0;

      style = {
        ...style,
        photos: photos.rows,
        skus: parsedSkus
      };

      return style;
    })
  );

  styleInfo.results = styles;
  return styleInfo;
};

module.exports.getRelated = async productId => {
  return await models
    .getRelated(productId)
    .then(related => related.rows.map(related => related.related_product_id));
};
