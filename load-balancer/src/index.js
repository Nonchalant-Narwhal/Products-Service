const proxy = require('express-http-proxy');
const app = require('express')();
const { HOST_1, HOST_2, PORT } = process.env;

let counter = 0;

const toggleCounter = () => {
  counter === 0 ? 1 : 0;
};

const selectProxyHost = () => {
  toggleCounter();
  return counter === 0 ? HOST_1 : HOST_2;
};

app.use('/', proxy(selectProxyHost));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
