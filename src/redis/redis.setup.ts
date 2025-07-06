import redis from 'redis';
import { config } from 'dotenv';
// Load environment variables from .env file
config();

const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

export default redisClient;