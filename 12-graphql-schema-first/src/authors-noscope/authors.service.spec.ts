import { Test } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { Author } from '../graphql.schema';
import { AuthorsNoscopeModule } from './authors-noscope.module';

describe('authorsService', () => {
  let authorsService: AuthorsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthorsNoscopeModule]
    }).compile();
    authorsService = moduleRef.get<AuthorsService>(AuthorsService);
  });

  describe('findAll', () => {
    it('should return an array of agents', async () => {
      const authors: Author[] = authorsService.findAll();
      console.log(authors);
    });
  });
});
