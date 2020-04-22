import { Module, Global } from '@nestjs/common';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}