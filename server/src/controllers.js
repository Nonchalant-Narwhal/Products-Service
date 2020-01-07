const models = require('./models');

module.exports.getProductList = async (page, count) => {
  page = page === undefined ? 1 : page;
  count = count === undefined ? 5 : count;

  const productList = await models.getProductList((page - 1) * count, count);

  return productList.rows;
};

module.exports.getProductInfoById = async id => {
  const { product, features } = await models.getProductAndFeaturesById(id);

  productInfo = product.rows[0];
  productInfo.features = [];
  features.rows.forEach(feature => productInfo.features.push(feature));
  return productInfo;
};

module.exports.getStyles = async productId => {
  const styleInfo = { product_id: Number(productId) };
  const styles = await models.getStyles(productId);

  styleInfo.results = styles;
  return styleInfo;
};

module.exports.getRelated = async productId => {
  return await models
    .getRelated(productId)
    .then(related => related.rows.map(related => related.related_product_id));
};
