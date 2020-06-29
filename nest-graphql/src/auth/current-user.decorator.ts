import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientCredential } from '../client-credentials/client-credentials';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): ClientCredential => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
