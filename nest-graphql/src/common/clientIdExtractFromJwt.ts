import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../auth/auth.service';

export function clientIdExtractFromJwt(authorizationHeader: string): string {
  const authToken = authorizationHeader;
  const jwtToken = authToken
    ? authToken.substring(authToken.indexOf(' ') + 1)
    : '';

  const decodedPayload: any = jwt.decode(jwtToken);

  return (decodedPayload as JwtPayload).username;
}
