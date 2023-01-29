import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { ChainableCommander, RedisKey } from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    multi(): ChainableCommander {
        return this.redis.multi();
    }

    async get(key: RedisKey): Promise<string> {
        return await this.redis.get(key);
    }

    async setex(key: RedisKey, expire: number, value: string) {
        await this.redis.setex(key, expire, value);
    }

    async unlink(key: RedisKey): Promise<void> {
        await this.redis.unlink(key);
    }

    async exists(key: RedisKey): Promise<number> {
        return await this.redis.exists(key);
    }

    public async lpos(key: RedisKey, element: string): Promise<number> {
        return await this.redis.lpos(key, element);
    }

    public async lrem(key: RedisKey, count: number, data: string): Promise<void> {
        await this.redis.lrem(key, count, data);
    }
}
