const express = require('express');
const router = express.Router();
const { getProductList } = require('./controllers');

router.get('/products/list', async (req, res) => {
  let { page, count } = req.query;
  const list = await getProductList(page, count);
  res.send(list);
});

module.exports = router;
