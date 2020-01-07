require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const { PORT } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
