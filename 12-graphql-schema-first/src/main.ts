import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ validateCustomDecorators: true }));

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}/graphql`);
}
bootstrap();
