import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsLoaderNorequest } from './authors.loader-norequest';

@Module({
  providers: [AuthorsService, AuthorsLoaderNorequest],
})
export class AuthorsNoscopeModule {}
