const redis = require('redis');

// Create the Redis client (Defaults to connecting to localhost:6379)
const redisClient = redis.createClient();

// Listen for connection success
redisClient.on('connect', () => {
    console.log('✅ Connected to Redis successfully!');
});

// Listen for errors (so your app doesn't crash if Redis goes down)
redisClient.on('error', (err) => {
    console.error('❌ Redis Client Error:', err);
});

// Function to actually establish the connection
const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
    }
};

// Export the client so you can use it in your routes, and the connect function for index.js
module.exports = {
    redisClient,
    connectRedis
};