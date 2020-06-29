import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  Scope,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DatabaseManagement } from './database-management';
import { clientIdExtractFromJwt } from '../common/clientIdExtractFromJwt';

@Injectable({ scope: Scope.REQUEST })
export class DatabaseInterceptor implements NestInterceptor {
  constructor(
    private readonly dbm: DatabaseManagement,
    private readonly logger: Logger
  ) {
    logger.setContext(this.constructor.name);
  }
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    this.logger.log('Before...');

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const fieldName = ctx.getInfo().fieldName;

    if (fieldName !== 'login') {
      await this.dbm.
        databaseConnectByClientKey(
          clientIdExtractFromJwt(request.headers.authorization)
        );
    }

    const now = Date.now();
    return await next
      .handle()
      .pipe(tap(() => this.logger.log(`After... ${Date.now() - now}ms`)));
  }
}
