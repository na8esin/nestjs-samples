import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    GqlExecutionContext.create(context).getArgs().user,
);