import { UseGuards, Logger } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from './gql-auth.guard';
import { Authorization } from '../graphql.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';

@Resolver('Auth')
export class AuthResolvers {
  constructor(private readonly authService: AuthService) { }

  @Query()
  @UseGuards(GqlAuthGuard)
  async login(@CurrentUser() user): Promise<Authorization> {
    console.log('ClientCredentialsResolvers');
    console.log(user);
    return await this.authService.login(user);
  }
}
