import { Module } from '@nestjs/common';
import { ClientCredentialsService } from './client-credentials.service';
import { MockClientCredentialsService } from './mock-client-credentials.service';
import { RedisModule } from '@nestjsplus/ioredis';
import { ConfigModule } from '../config/config-module';
import { ConfigService } from '../config/config.service';
import { RedisModuleOptions } from '@nestjsplus/ioredis/dist/interfaces/redis-module-options.interface';
import { clientCredentialDummy } from './client-credentials.dummydata';

const RedisModuleRegister = RedisModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => (
    configService.getRedisOptions()
  ),
  inject: [ConfigService],
});

const clientCredentialsServiceProvider = {
  provide: ClientCredentialsService,
  useClass:
    process.env.MOCK_MODE === 'true'
      || process.env.NODE_ENV === 'test'
      || process.env.NODE_ENV === 'development'
      ? MockClientCredentialsService
      : ClientCredentialsService,
}

// ダミークラス
class RedisService {
  client = {
    set: () => { },
    get: () => {
      return JSON.stringify(clientCredentialDummy[0]); // return demo
    }
  }
}

@Module({
  providers: [
    clientCredentialsServiceProvider,
    RedisService
  ],
  exports: [clientCredentialsServiceProvider],
})
export class ClientCredentialsModule { }
