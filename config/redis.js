const redis = require('redis');
const { promisify } = require('util');

require('dotenv').config();
// console.log(process.env.REDIS_PASSWORD);
// Create a Redis client
const redisClient = redis.createClient({
  host: "redis-17227.c17.us-east-1-4.ec2.cloud.redislabs.com" ,
  port:17227 ,
  password: "bJXnwCxAAtEQjntc54ownEqRlcHmTy1o" ,
});

// Promisify Redis client methods for async/await
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Event listeners for Redis client
// redisClient.connect();
redisClient.on('error', (error) => {
  console.error('Error connecting to Redis:', error);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

module.exports = {
  redisClient,
  getAsync,
  setAsync,
};
