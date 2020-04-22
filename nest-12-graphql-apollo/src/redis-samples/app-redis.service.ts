import { Injectable } from "@nestjs/common";
import { RedisService } from "@nestjsplus/ioredis";

@Injectable()
export class AppRedisService {
  constructor(private readonly redisService: RedisService) {}

  set(clientId: string, clientSecret: string) {
    console.log("set");
    const client = {
      clientId: clientId,
      clientSecret: clientSecret
    };
    return this.redisService.client.set(
      this.createKey(clientId, clientSecret),
      JSON.stringify(client)
    );
  }

  async get(clientId: string, clientSecret: string) {
    return await this.redisService.client.get(
      this.createKey(clientId, clientSecret)
    );
  }

  createKey(clientId: string, clientSecret: string): string {
    return clientId + ":" + clientSecret;
  }
}
