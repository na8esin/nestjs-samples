import { Test } from '@nestjs/testing';
import { AuthorsModule } from './authors.module';
import { AuthorsService } from './authors.service';
import { Author } from '../graphql.schema';

describe('authorsService', () => {
  let authorsService: AuthorsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthorsModule]
    }).compile();
    authorsService = moduleRef.get<AuthorsService>(AuthorsService);
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const authors: Author[] = authorsService.findAll();

      // リクエストスコープが混ざった場合、アロー関数だとなぜか下記
      // TypeError: authorsService.batchLoadFn is not a function
      authorsService.batchLoadFn(1);
      console.log(authors);
    });
  });
});
