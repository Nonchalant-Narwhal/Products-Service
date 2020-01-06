const express = require('express');
const router = express.Router();
const { getProductList, getProductInfoById } = require('./controllers');

router.get('/products/list', async (req, res) => {
  try {
    let { page, count } = req.query;
    const list = await getProductList(page, count);
    res.send(list);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productInfo = await getProductInfoById(id);
    res.send(productInfo);
  } catch (err) {
    res.sendStatus(404);
  }
});

module.exports = router;
