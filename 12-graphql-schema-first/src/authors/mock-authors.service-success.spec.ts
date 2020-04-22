import { Test } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { Author } from '../graphql.schema';
import { ContextIdFactory } from '@nestjs/core';
import { MockAuthorsModule } from './mock-authors.module';
import { MockAuthorsService } from './mock-authors.service';
import { AuthorsLoader } from './authors.loader';

describe('authorsService', () => {
  let authorsService: MockAuthorsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        MockAuthorsService,
        AuthorsLoader],
    }).compile();

    const contextId = ContextIdFactory.create();
    jest
      .spyOn(ContextIdFactory, 'getByRequest')
      .mockImplementation(() => contextId);

    authorsService = await moduleRef.resolve(MockAuthorsService, contextId);
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const authors: Author[] = authorsService.findAll();
      authorsService.batchLoadFn(1);
      console.log(authors);
    });
  });
});
