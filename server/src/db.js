const { Pool } = require('pg');
const { DB_USER, DB_PASSWORD } = process.env;

const db = new Pool({
  host: 'db',
  user: DB_USER,
  password: DB_PASSWORD
});

module.exports = db;
