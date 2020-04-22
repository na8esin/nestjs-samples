import { Test } from '@nestjs/testing';
import { CatsModule } from './cats.module';
import { CatsService } from './cats.service';
import { Cat } from 'src/graphql.schema';

describe('AgentsService', () => {
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatsModule]
    }).compile();
    catsService = moduleRef.get<CatsService>(CatsService);
  });

  describe('findAll', () => {
    it('should return an array of agents', async () => {
      const cats: Cat[] = catsService.findAll();
      console.log(cats);
    });
  });
});
