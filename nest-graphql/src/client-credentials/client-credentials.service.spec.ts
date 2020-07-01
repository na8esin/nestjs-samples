import { Test, TestingModule } from '@nestjs/testing';
import { ClientCredentialsService } from './client-credentials.service';
import { ClientCredentialsModule } from './client-credentials.module';

describe('ClientCredentialsService', () => {
  let service: ClientCredentialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientCredentialsModule],
    }).compile();

    service = module.get<ClientCredentialsService>(ClientCredentialsService);
  });

  it('findOne', async () => {
    const one = await service.findOne('demo', 'abcdefgh');
    console.log(one);
  });

  afterAll(async () => {
    service.getClient().disconnect();
  });
});
