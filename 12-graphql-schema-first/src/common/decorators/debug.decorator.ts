import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const Debug = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    //      GqlExecutionContext.create(ctx).getArgs().user,

    // reqって内容が多すぎる。expressのリファレンス見ればいいんだっけ？
    //    console.log(ctx.getContext().req)
    //console.log(ctx.getContext());
    // これはシンプルに引数だけ
    console.log(ctx.getArgs());
    // graphql
    console.log(ctx.getType());
    console.log(ctx.getRoot());
    // fieldName: 'upvotePost'とか
    console.log(ctx.getInfo());

  }
);