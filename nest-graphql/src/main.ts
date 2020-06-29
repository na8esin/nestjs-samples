import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { createConnection } from 'typeorm';
import { ConfigModule } from './config/config-module';
import { ConfigService } from './config/config.service';
import expressWinston from 'express-winston';
import {
  createLogger,
  expressWinstonAccessLogOption
} from './createLogger';
import { createLimiter } from './createLimiter';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const logger = createLogger();
  const app = await NestFactory
    .create(ApplicationModule, {
      logger: createLogger()
    });
  app.useGlobalPipes(
    new ValidationPipe(
      {
        validateCustomDecorators: true,
      }));

  // TODO: 起動時にDBとredisの接続確認が必要?

  app.use(expressWinston.logger(expressWinstonAccessLogOption));
  app.use(createLimiter());

  const configService = app
    .select(ConfigModule)
    .get(ConfigService, { strict: true });

  await app.listen(port, async () => {
    // 下記で起動時のDB接続の確認もできる
    await createConnection(configService.getConnectionOptions('master'));
  }).catch((e) => {
    logger.log(e);
  });
  logger.log(
    `🚀 Server running on http://localhost:${port}/graphql`,
    'Bootstrap',
  );
}
bootstrap();
