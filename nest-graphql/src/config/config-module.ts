import { Module, Global, DynamicModule, Logger } from '@nestjs/common';
import { ConfigService } from './config.service';
import { DatabaseManagement } from '../database/database-management';
import { ModuleMetadata } from '@nestjs/common/interfaces';

const moduleSetting: ModuleMetadata = {
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `src/config/${process.env.NODE_ENV || 'development'}.env`,
      ),
    },
    {
      provide: DatabaseManagement,
      useFactory: async (configService: ConfigService) => {
        return new DatabaseManagement(configService);
      },
      useExisting: DatabaseManagement,
      inject: [ConfigService],
    },
    Logger
  ],
  exports: [ConfigService, DatabaseManagement],
}
@Global()
@Module(moduleSetting)
export class ConfigModule { }
