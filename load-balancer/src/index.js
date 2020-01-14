const proxy = require('express-http-proxy');
const app = require('express')();
const bodyParser = require('body-parser');
var compression = require('compression');
const { HOST_1, HOST_2, PORT } = process.env;
const cache = require('./cache');

let counter = 0;

const toggleCounter = () => {
  counter === 0 ? 1 : 0;
};

const selectProxyHost = async req => {
  const { originalUrl } = req;
  const cachedHost = await cache.get(originalUrl);

  if (cachedHost === null) {
    toggleCounter();
    const selectedHost = counter === 0 ? HOST_1 : HOST_2;
    cache.set(originalUrl, selectedHost);

    return selectedHost;
  } else {
    return cachedHost;
  }
};

app.use(bodyParser.json());

app.use(
  '/',
  async (req, res, next) =>
    await proxy(await selectProxyHost(req))(req, res, next)
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// const proxy = require('express-http-proxy');
// const app = require('express')();
// const bodyParser = require('body-parser');
// const { HOST_1, HOST_2, PORT } = process.env;
// const cache = require('./cache');
// const axios = require('axios');

// let counter = 0;

// const toggleCounter = () => {
//   counter === 0 ? 1 : 0;
// };

// const selectProxyHost = async (req, res) => {
//   const { originalUrl } = req;
//   const cachedHost = await cache.get(originalUrl);

//   if (cachedHost === null) {
//     toggleCounter();
//     const selectedHost = counter === 0 ? HOST_1 : HOST_2;
//     cache.set(originalUrl, selectedHost);

//     res.send(
//       await axios
//         .get('http://' + selectedHost + originalUrl)
//         .then(results => results.data)
//     );
//   } else {
//     res.send(
//       await axios
//         .get('http://' + cachedHost + originalUrl)
//         .then(results => results.data)
//     );
//   }
// };

// // app.use(bodyParser.json());

// // app.use(
// //   '/',
// //   async (req, res, next) =>
// //     await proxy(await selectProxyHost(req))(req, res, next)
// // );

// app.get('*', async (req, res) => {
//   try {
//     await selectProxyHost(req, res);
//   } catch (err) {
//     console.error(err);
//   }
// });

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
