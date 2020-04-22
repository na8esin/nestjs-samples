import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { PostsService } from '../posts/posts.service';
import { Logger } from '@nestjs/common';
import { Author } from 'src/graphql.schema';
import { map } from 'rxjs/operators';

@Resolver('Author')
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
  ) {}

  @Query('author')
  async getAuthor(@Args('id') id: number) {
    return await this.authorsService.findOneById(id);
  }

  @Query()
  async authors(): Promise<Author[]> {
    return await this.authorsService
    .findAll()
    .pipe(
        map(response => response.data)
      )
      .toPromise();
  }

  // 下記の引数'posts'はgraphql.schema.tsのAuthor typeのプロパティ名
  @ResolveProperty('posts')
  async getPosts(@Parent() author) {
    // オブジェクトの分割代入
    const { id } = author;
    Logger.log(author);
    Logger.log(id);

    // authorのidとpostのidが一致するという状況がおかしくないか？
    // authorのidとpostのauthor_idが一致するというなら理解できるが
    return await this.postsService.findAll({ authorId: id });
  }
}