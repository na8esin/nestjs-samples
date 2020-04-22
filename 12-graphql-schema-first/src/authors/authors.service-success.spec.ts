import { Test } from '@nestjs/testing';
import { AuthorsModule } from './authors.module';
import { AuthorsService } from './authors.service';
import { Author } from '../graphql.schema';
import { ContextIdFactory } from '@nestjs/core';

describe('authorsService', () => {
  let authorsService: AuthorsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthorsModule]
    }).compile();

    const contextId = ContextIdFactory.create();
    jest
      .spyOn(ContextIdFactory, 'getByRequest')
      .mockImplementation(() => contextId);

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
