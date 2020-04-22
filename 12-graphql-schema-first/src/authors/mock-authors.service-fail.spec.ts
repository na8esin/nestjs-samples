import { Test } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { Author } from '../graphql.schema';
import { ContextIdFactory } from '@nestjs/core';
import { MockAuthorsModule } from './mock-authors.module';

describe('authorsService', () => {
  let authorsService: AuthorsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MockAuthorsModule]
    }).compile();

    const contextId = ContextIdFactory.create();
    jest
      .spyOn(ContextIdFactory, 'getByRequest')
      .mockImplementation(() => contextId);

    // 'getInstanceByContextId' of undefined
    // useClassとscope: Scope.REQUESTがぶつかるとresolveできないっぽい
    // https://github.com/nestjs/nest/issues/2049
    // たぶんe2eテストならうまく行く気がする
    // もしくは、importsを使用しないでモジュール定義する
    console.log(moduleRef);
    authorsService = await moduleRef.resolve(AuthorsService, contextId);
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const authors: Author[] = authorsService.findAll();
      authorsService.batchLoadFn(1);
      console.log(authors);
    });
  });
});
