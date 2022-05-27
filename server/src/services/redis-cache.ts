import { RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts, createClient } from 'redis'
import applicationLogger from '../logger/application-logger';

class RedisCache{
   private client!: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;

  async connect(){
    this.client = createClient({
      password: process.env.REDIS_PASSWORD,
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    });
    this.client.on('error', this.onError);
    await this.client.connect();
    applicationLogger.logInfo(`🔥[REDIS]: connected at PORT: ${process.env.REDIS_PORT}`)
  }

  async getClient(){
    return await this.client;
  }

  async onError(error: any){
    console.log("Redis client error", error);
  }
}

export const redisInstance = new RedisCache()
export default redisInstance.getClient();