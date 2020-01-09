const { Pool } = require('pg');
const { DB_USER, DB_PASSWORD, DB_HOST } = require('../config.js');

const db = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD
});

module.exports = db;
