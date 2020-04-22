import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsLoader } from './authors.loader';

@Module({
  providers: [AuthorsService, AuthorsLoader],
})
export class AuthorsModule {}
