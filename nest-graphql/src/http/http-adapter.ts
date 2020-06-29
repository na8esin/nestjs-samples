import {
  Injectable,
  HttpService,
  BadRequestException, Scope, Logger, Inject, LoggerService
} from '@nestjs/common';
import * as querystring from 'query-string';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { DatabaseManagement } from '../database/database-management';

export interface GainaResponse<T> {
  data: T;
  errors: [];
  exception: [];
}

export interface ConnectionResponse<T> {
  aggregate: {
    count: number
  }
  data: [T]
}

export interface GainaResponseMany<T> {
  data: T[];
  errors: [];
  exception: [];
}
// TODO 最初のフェーズだとあまり意味がないかも
export type GainaParameters = {
  controller: string;
  action: string;
  identity?: string;
  userId?: number;
  id?: number;
  // 顧客検索だけで使う
  operatorUserId?: number
};

@Injectable({ scope: Scope.DEFAULT })
export class HttpAdapter {
  constructor(
    private readonly httpService: HttpService,
    private readonly dbm: DatabaseManagement
  ) { }

  async findAll<T>(
    url: string,
    parameters: GainaParameters,
  ): Promise<T[]> {
    return this.httpService
      // 本当はgetだけどどっちでもいい
      // パラメータはbodyに入れるかクエリかの違いがある
      .post(
        await this.urlWithDbName(url),
        querystring.stringify(parameters, { arrayFormat: 'bracket' })
      )
      .pipe(
        map((response: AxiosResponse<GainaResponseMany<T>>) => {
          //console.log(response);
          return response.data.data;
        }),
      )
      .toPromise();
  }

  async connection<T>(
    url: string,
    parameters: GainaParameters,
  ): Promise<ConnectionResponse<T>> {
    return this.httpService
      .post(
        await this.urlWithDbName(url),
        querystring.stringify(parameters, { arrayFormat: 'bracket' })
      )
      .pipe(
        map((response: AxiosResponse<GainaResponse<ConnectionResponse<T>>>) => {
          const data: GainaResponse<ConnectionResponse<T>>
            = response.data;
          console.log(data.exception);
          return data.data;
        }),
      )
      .toPromise();
  }

  async findOne<T>(url: string,
    parameters: GainaParameters,
  ): Promise<T> {
    return this.httpService
      .post(
        await this.urlWithDbName(url),
        querystring.stringify(parameters))
      .pipe(
        map((response: AxiosResponse<GainaResponse<T>>) => {
          //console.log(response);
          return response.data.data;
        }),
      )
      .toPromise();
  }

  // update or insert or logical delete
  async post<T>(
    url: string,
    parameters: GainaParameters,
  ): Promise<T> {
    //    console.log(parameters);
    const data = await this.httpService
      .post(
        await this.urlWithDbName(url),
        querystring.stringify(parameters, { arrayFormat: 'bracket' }))
      .pipe(
        map((response: AxiosResponse<GainaResponse<T>>) => {
          console.log(response.data.data);
          console.log(response.data.errors);
          console.log(response.data.exception);
          return response.data;
        }),
      )
      .toPromise();

    if (Object.keys(data.exception).length !== 0) {
      throw new BadRequestException(data.exception);
    } else if (Object.keys(data.errors).length !== 0) {
      throw new BadRequestException(data.errors);
    }

    return data.data;
  }

  async urlWithDbName(url: string): Promise<string> {
    //const dbm = await this.moduleRef.resolve(DatabaseManagement);
    //console.log(dbm.databaseName);
    return url + '?db_conf_name=' + this.dbm.databaseName;
  }
}
