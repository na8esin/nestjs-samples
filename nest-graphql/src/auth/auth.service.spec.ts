import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ClientCredentialsModule } from '../client-credentials/client-credentials.module';
import { Oauth2ClientPasswordStrategy } from './oauth2-client-password.strategy';
import { AuthResolvers } from './auth.resolvers';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientCredentialsModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '600s' },
        }),
      ],
      providers: [
        AuthService,
        JwtStrategy,
        Oauth2ClientPasswordStrategy,
        AuthResolvers,
      ],
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
