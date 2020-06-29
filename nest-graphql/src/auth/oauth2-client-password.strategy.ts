import { Strategy } from 'passport-oauth2-client-password';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class Oauth2ClientPasswordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(clientId: string, clientSecret: string): Promise<any> {
    console.log('Oauth2ClientPasswordStrategy. validate start');
    console.log(clientId);
    console.log(clientSecret);
    // ここの引数をオブジェクトに変えることはできるといえばできる
    const user = await this.authService.validateUser(clientId, clientSecret);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('Oauth2ClientPasswordStrategy.validate:');
    console.log(user);
    return user;
  }
}
