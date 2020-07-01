import { Injectable } from '@nestjs/common';
import { ClientCredential } from './client-credentials';
import { clientCredentialDummy } from './client-credentials.dummydata';

@Injectable()
export class MockClientCredentialsService {
  private readonly clientCredentials: ClientCredential[]
    = clientCredentialDummy

  async findOne(
    clientId: string,
    clientSecret: string,
  ): Promise<ClientCredential | undefined> {
    return await this.clientCredentials.find(
      e =>
        e.clientId === clientId && e.clientSecret === clientSecret
    );
  }

  getCreatedKey(clientId: string, clientSecret: string): string {
    return clientId + ':' + clientSecret;
  }
}
