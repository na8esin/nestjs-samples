import { Module, Logger, Scope } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { ClientCredentialsModule } from './client-credentials/client-credentials.module';
import { ConfigModule } from './config/config-module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseManagement } from './database/database-management';
import { DatabaseInterceptor } from './database/database.interceptor';
import { HttpAdapterModule } from './common/http-adapter-module';

@Module({
  imports: [
    AuthModule,
    ClientCredentialsModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
    }),
    ConfigModule,
    HttpAdapterModule
  ],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useFactory: (
        databaseManagement: DatabaseManagement,
        logger: Logger
      ) => {
        return new DatabaseInterceptor(databaseManagement, logger);
      },
      inject: [DatabaseManagement, Logger],
    },
  ],
})
export class ApplicationModule { }
