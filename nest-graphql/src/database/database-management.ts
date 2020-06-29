import { Logger, Injectable, Scope } from '@nestjs/common';
import {
  getRepository,
  ConnectionManager,
  QueryRunner,
  Repository,
  ObjectType,
  EntitySchema,
} from 'typeorm';
import { ConfigService } from '../config/config.service';
import { ClientEntity } from '../clients/client.entity';

// queryRunner.release();がどこでも行われていない
// Scope.DEFAULTはアプリケーションコンテキストになるのでダメ
@Injectable({
  scope: ['test'].includes(process.env.NODE_ENV) ? Scope.DEFAULT : Scope.DEFAULT
})
export class DatabaseManagement {
  // トランザクションしたいからpublic. 外部からのsetだけ禁止にしたい
  public queryRunner: QueryRunner;
  private connectionManager: ConnectionManager;
  // getterを使うとプロパティには_つけないと多重定義になる
  // jsでは関数もプロパティ？
  // getterを get getdatabaseNameにしたら、冗長だねぇ
  private _databaseName: string;

  constructor(private readonly configService: ConfigService) { }

  // Interceptorから呼び出される
  async databaseConnectByClientKey(clientKey: string)
    : Promise<void> {
    Logger.debug('databaseConnectByClientKey');
    this._databaseName =
      await this.getClientKeyFromMasterDb(clientKey);
    Logger.debug(this._databaseName);
    this.queryRunnerConnect(this._databaseName);
  }

  // clientテーブルから、db_conf_nameを取得する
  // masterはサーバ起動時に接続済み(←ここがわかりずらい)
  async getClientKeyFromMasterDb(clientKey: string): Promise<string> {
    console.log('getClientKeyFromDb start.');
    const client: ClientEntity = await getRepository(ClientEntity).findOne({
      select: ['dbConfName'],
      where: { clientKey: clientKey },
    });
    return client.dbConfName;
  }

  // テストするときはここから呼ぶ
  // 生成されたqueryRunnerをプロパティにセット
  async queryRunnerConnect(databaseName: string)
    : Promise<any> {
    this.queryRunner = await this.createQueryRunner(databaseName);
    await this.queryRunner.connect();
  }

  // 新しいConnectionManagerをプロパティにセット
  async createQueryRunner(databaseName: string) {
    // ConnectionManagerはスキーマを切り替えるために必要
    this.connectionManager = new ConnectionManager();
    const defaulConnection = await this.connectionManager
      .create(this.configService.getConnectionOptions(databaseName))
      .connect();
    return defaulConnection.createQueryRunner();
  }

  // queryRunnerConnect()に依存している
  // このメソッド実行時に接続されてなかったら、
  // _databaseNameを見て接続してもいいと思うが、
  // かなり安全性が担保できないとやりたくない
  getQueryManager() {
    return this.queryRunner.manager;
  }

  getRepository<Entity>(
    target: ObjectType<Entity> | EntitySchema<Entity> | string,
  ): Repository<Entity> {
    return this.getQueryManager().getRepository(target);
  }

  async close(): Promise<void> {
    console.log(this.connectionManager.connections.length);
    if (this.connectionManager.has('default')) {
      const connection = this.connectionManager.get('default');
      if (connection.isConnected) {
        return await connection
          .close()
          .then(() => console.log('connection closing.'));
      }
    }
  }

  get databaseName(): string {
    return this._databaseName;
  }
}
