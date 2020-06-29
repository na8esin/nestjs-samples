import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { Oauth2ClientPasswordStrategy } from './oauth2-client-password.strategy';
import { ClientCredentialsModule } from '../client-credentials/client-credentials.module';
import { AuthResolvers } from './auth.resolvers';

@Module({
  imports: [
    ClientCredentialsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000000s' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    Oauth2ClientPasswordStrategy,
    AuthResolvers,
  ],
  exports: [AuthService],
})
export class AuthModule { }
