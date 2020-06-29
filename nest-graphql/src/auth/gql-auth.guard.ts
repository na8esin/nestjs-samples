import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('oauth2-client-password') {
  // https://docs.nestjs.com/techniques/authentication#graphql
  // override
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    //console.log(ctx);
    const request = ctx.getContext().req;
    //console.log('GqlAuthGuard : ' + ctx.getArgs().client_id);

    // リクエストボディに詰めなおさないと
    // Oauth2ClientPasswordStrategyで取得できない
    request.body['client_id'] = ctx.getArgs().client_id;
    request.body['client_secret'] = ctx.getArgs().client_secret;

    return request;
  }
}
