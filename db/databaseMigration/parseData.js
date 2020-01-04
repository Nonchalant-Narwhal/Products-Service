const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const setMap = {
  features: {
    headers: ['id', 'product_id', 'feature', 'value'],
    path: './data-csv/features.csv'
  },
  photos: {
    headers: ['id', 'style_id', 'url', 'thumbnail_url'],
    path: './data-csv/photos.csv'
  },
  product: {
    headers: [
      'id',
      'name',
      'slogan',
      'description',
      'category',
      'default_price'
    ],
    path: './data-csv/product.csv'
  },
  related: {
    headers: ['id', 'current_product_id', 'related_product_id'],
    path: './data-csv/related.csv'
  },
  skus: {
    headers: ['id', 'styleId', 'size', 'quantity'],
    path: './data-csv/skus.csv'
  },
  styles: {
    headers: [
      'id',
      'productId',
      'name',
      'sale_price',
      'original_price',
      'default_style'
    ],
    path: './data-csv/styles.csv'
  }
};

module.exports = parseData = (set, callback) => {
  return new Promise((res, rej) => {
    const headers = setMap[set].headers;
    fs.createReadStream(path.join(__dirname, setMap[set].path))
      .pipe(csv({ headers, skipLines: 1 }))
      .on('data', data => callback(data))
      .on('end', () => res());
  });
};
