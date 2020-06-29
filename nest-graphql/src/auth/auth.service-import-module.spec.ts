import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // importsを使っても2重インジェクトは呼び出せる
      imports: [AuthModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });
  describe('login', () => {
    it('should return a normal access token', async () => {
      const access_token = await service.login({ clientId: "demo", userId: 1 });
      console.log(access_token);
    });
  });

  describe('validateUser', () => {
    it('should return a user', async () => {
      const user = await service.validateUser("demo", "abcdefgh");
      console.log(user);
    });
  });
});
