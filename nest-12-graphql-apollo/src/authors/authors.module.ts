import { Module, HttpModule } from '@nestjs/common';
import { AuthorResolver  } from './author.resolver';
import { AuthorsService } from './authors.service';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [PostsModule, HttpModule],
  providers: [AuthorsService, AuthorResolver],
})
export class AuthorsModule {}