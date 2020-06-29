const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

export const createLimiter = new RateLimit({
    store: new RedisStore({
        db: 1
    }),
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});