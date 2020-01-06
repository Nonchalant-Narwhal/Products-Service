const models = require('./models');

module.exports.getProductList = async (page, count) => {
  page = page === undefined ? 1 : page;
  count = count === undefined ? 5 : count;

  productList = await models.getProductList((page - 1) * count, count);

  return productList.rows;
};
