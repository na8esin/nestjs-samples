import { GqlExecutionContext, Args } from "@nestjs/graphql";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ClientCredential } from "../client-credentials/client-credentials";

// typeorm用
export const CreateDto = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    // getArgsは型を指定して実行できるが、dataを変換して入れる方法がわからない
    const args = ctx.getArgs();
    const dto = args[data];

    // req.userはAuthGuardで代入するっぽい
    const user: ClientCredential = ctx.getContext().req.user;

    // TODO 本当は@Argsを利用したい。
    dto.createdUserId = user.userId;
    dto.modifiedUserId = user.userId;
    return dto;
  },
);

// typeorm用
export const UpdateDto = createParamDecorator(
  // dataはデコレータの引数
  (data: string, context: ExecutionContext) => {
    console.log('I am @UpdateDto');
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    const dto = args[data];
    const user: ClientCredential = ctx.getContext().req.user;
    dto.modifiedUserId = user.userId;
    return dto;
  },
);

// とりあえず、validateに関する検証用
export const Dto = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    // ctxの中にpipないの？
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    console.log(args);
  },
);

// Cakeとやり取りするdto
export const AddUserId = createParamDecorator(
  // dataはデコレータの引数
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    //    console.log(args);
    const user: ClientCredential = ctx.getContext().req.user;
    const dto = {
      userId: user.userId,
      ...args[data]
    }
    return dto;
  },
);
