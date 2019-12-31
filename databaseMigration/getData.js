const fs = require('fs');
const csv = require('csv-parser');

module.exports.getFeaturesData = callback => {
  return new Promise((res, rej) => {
    fs.createReadStream('./data-csv/features.csv')
      .pipe(csv())
      .on('data', data => callback(data))
      .on('end', () => res());
  });
};

module.exports.getPhotosData = callback => {
  return new Promise((res, rej) => {
    fs.createReadStream('./data-csv/photos.csv')
      .pipe(csv())
      .on('data', data => callback(data))
      .on('end', () => res());
  });
};
