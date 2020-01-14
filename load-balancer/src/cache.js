const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient({
  host: 'cache'
});

module.exports = {
  ...client,
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  expire: promisify(client.expire).bind(client)
};
