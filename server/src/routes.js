const express = require('express');
const router = express.Router();
const cache = require('./cache');
const {
  getProductList,
  getProductInfoById,
  getStyles,
  getRelated
} = require('./controllers');

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

router.get('/products/:product_id/styles', async (req, res) => {
  try {
    const { product_id: productId } = req.params;
    const cachedResult = await cache.hget('styles', productId);
    let styles;

    if (cachedResult === null) {
      styles = await getStyles(productId);
      cache.hset('styles', productId, JSON.stringify(styles));
    } else {
      styles = JSON.parse(cachedResult);
    }

    res.send(styles);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.get('/products/:product_id/related', async (req, res) => {
  try {
    const { product_id: productId } = req.params;
    const related = await getRelated(productId);
    res.send(related);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.get(`/${process.env.LOADER_KEY}`, (req, res) => {
  res.send(process.env.LOADER_KEY);
});

module.exports = router;
