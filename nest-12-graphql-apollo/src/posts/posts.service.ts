import { Injectable } from '@nestjs/common';
import { Post } from '../graphql.schema';

@Injectable()
export class PostsService {
  private readonly posts: Post[] = 
    [{ id: 1, title: 'Star Wars', votes: 3 },
      {id: 2, title: 'Stand By Me', votes: 7}
    ];

  findAll({ authorId: number }): Post[] {
    return this.posts;
  }
}
