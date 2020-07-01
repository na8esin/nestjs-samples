import { Module } from '@nestjs/common';
import { ClientCredentialsService } from './client-credentials.service';
import { MockClientCredentialsService } from './mock-client-credentials.service';
import { RedisModule } from 'nestjs-redis'
import { ConfigModule } from '../config/config-module';
import { ConfigService } from '../config/config.service';
import { clientCredentialDummy } from './client-credentials.dummydata';

const RedisModuleRegister = RedisModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<any> => (
    configService.getRedisOptions()
  ),
  inject: [ConfigService],
});

const clientCredentialsServiceProvider = {
  provide: ClientCredentialsService,
  useClass:
    process.env.MOCK_MODE === 'true'
      ? MockClientCredentialsService
      : ClientCredentialsService,
}

// ダミークラス
class MockRedisService {
  client = {
    set: () => { },
    get: () => {
      return JSON.stringify(clientCredentialDummy[0]); // return demo
    }
  }
}

@Module({
  imports: [
    RedisModuleRegister
  ],
  providers: [
    clientCredentialsServiceProvider,
  ],
  exports: [clientCredentialsServiceProvider],
})
export class ClientCredentialsModule { }
