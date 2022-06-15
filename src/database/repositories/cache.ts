import IORedis from 'ioredis';
import Redis from '../connections/Redis'

export class CacheRepository {
    private readonly redis: IORedis.Redis;

    constructor() {
        this.redis = Redis.getInstance();
    }

    async set(key: string, value: any) {
        return await this.redis.set(key, JSON.stringify(value));
    }

    async setEx(key: string, value: any, ttl: number) {
        return await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    }

    async get(key: string) {
        const value = await this.redis.get(key);

        return value ? JSON.parse(value) : null;
    }

    async del(key: string) {
        const result = await this.redis.del(key);

        return result !== 0;
    }
}