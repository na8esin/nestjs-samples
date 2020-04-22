import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsLoader } from './authors.loader';
import { MockAuthorsService } from './mock-authors.service';

const serviceProvider = {
  provide: AuthorsService,
  useClass:
    process.env.MOCK_MODE === 'true'
      ? MockAuthorsService
      : AuthorsService,
};

@Module({
  providers: [
    serviceProvider,
    AuthorsLoader],
  exports: [
    serviceProvider
  ],
})
export class MockAuthorsModule { }
