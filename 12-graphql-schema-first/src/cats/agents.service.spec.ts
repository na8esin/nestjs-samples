import { Test } from '@nestjs/testing';
import { CatsModule } from './cats.module';
import { CatsService } from './cats.service';

describe('AgentsService', () => {
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatsModule]
    }).compile();
    agentsService = moduleRef.get<AgentsService>(AgentsService);
  });

  describe('findAll', () => {
    it('should return an array of agents', async () => {
      const agents: Agent[] = agentsService.findAll();
      console.log(agents);

      // アローメソッドでも問題なく動く
      console.log(await agentsService.batchLoadFn(2));

      expect(agents).toEqual(agentsDummy);
    });
  });
});
