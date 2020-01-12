const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient({
  host: 'cache'
});

module.exports = {
  ...client,
  hget: promisify(client.hget).bind(client),
  hset: promisify(client.hset).bind(client),
  expire: promisify(client.expire).bind(client)
};
