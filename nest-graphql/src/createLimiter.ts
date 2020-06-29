const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

// 
export const createLimiter = () => new RateLimit({
    store: new RedisStore({
        redisURL: 'redis://127.0.0.1:6379/1'
    }),
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 5, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});