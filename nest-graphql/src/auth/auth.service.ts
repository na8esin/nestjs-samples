import { Injectable, Logger } from '@nestjs/common';
import {
  ClientCredentialsService,
} from '../client-credentials/client-credentials.service';
import { JwtService } from '@nestjs/jwt';
import { ClientCredential } from '../client-credentials/client-credentials';

export type JwtPayload = {
  username: ClientCredential['clientId'];
  sub: ClientCredential['userId'];
  iat?: number;
  exp?: number;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly clientCredentialsService: ClientCredentialsService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(clientId: string, clientSecret: string): Promise<any> {
    // ここの時点では、DBに問い合わせてるのか、redisなのかは、気にしたくない
    const user = await this.clientCredentialsService.findOne(
      clientId,
      clientSecret,
    );
    if (user) {
      // TODO redisの取得結果だからpasswordなんてなくない？
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // やってることはcreate access_token
  // だけど、公式がこういうメソッド名だから併せておく
  async login(user: ClientCredential) {
    const payload: JwtPayload = {
      username: user.clientId,
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
