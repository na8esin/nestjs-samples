import { Strategy } from 'passport-oauth2-client-password';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException , Logger} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class Oauth2ClientPasswordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(clientId: string, clientSecret: string): Promise<any> {
    const user = await this.authService.validateUser2(clientId, clientSecret);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
