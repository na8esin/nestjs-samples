import { Injectable } from '@nestjs/common';
import { RedisService } from '@nestjsplus/ioredis';
import { ClientCredential } from './client-credentials';
import { clientCredentialDummy } from './client-credentials.dummydata';

// redisの取得登録を行う
// やってることは、redisを使いやすくしているだけ
@Injectable()
export class ClientCredentialsService {
  private readonly clientCredentials: ClientCredential[]

  constructor(private readonly redisService: RedisService) {
    this.clientCredentials = clientCredentialDummy;
    // dummyデータ登録
    for (const clientCredential of this.clientCredentials) {
      redisService.client.set(
        this.getCreatedKey(
          clientCredential.clientId,
          clientCredential.clientSecret,
        ),
        JSON.stringify(clientCredential),
      );
    }
  }

  async findOne(
    clientId: string,
    clientSecret: string,
  ): Promise<ClientCredential | undefined> {
    const json = await this.redisService.client.get(
      this.getCreatedKey(clientId, clientSecret),
    );
    console.log(json);
    return JSON.parse(json);
  }

  getCreatedKey(clientId: string, clientSecret: string): string {
    return clientId + ':' + clientSecret;
  }
}
