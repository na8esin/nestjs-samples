import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { RedisService } from 'nestjs-redis';
import { ClientCredential } from './client-credentials';
import { clientCredentialDummy } from './client-credentials.dummydata';

// redisの取得登録を行う
// やってることは、redisを使いやすくしているだけ
@Injectable()
export class ClientCredentialsService {
  constructor(private readonly redisService: RedisService) { }

  async findOne(
    clientId: string,
    clientSecret: string,
  ): Promise<ClientCredential | undefined> {
    const json = await this.redisService.getClient().get(
      this.getCreatedKey(clientId, clientSecret),
    );
    console.log(json);
    return JSON.parse(json);
  }

  getCreatedKey(clientId: string, clientSecret: string): string {
    return clientId + ':' + clientSecret;
  }

  // testとバッチで使う
  getClient(): Redis.Redis {
    return this.redisService.getClient();
  }
}
