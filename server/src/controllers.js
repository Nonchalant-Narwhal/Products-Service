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
