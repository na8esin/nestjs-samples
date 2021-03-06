import { Test } from '@nestjs/testing';
import { ConfigModule } from '../config/config-module';
import { DatabaseManagement } from '../database/database-management';
import { findAll } from './typeorm';

describe('ExpertiseFieldService', () => {
  let dbm: DatabaseManagement;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      // testのときはDatabaseManagementはデフォルトスコープで
      // インジェクトするようにしたので、バグは回避
      imports: [
        ConfigModule,
        SomeModule],
    }).compile();

    dbm = module.get(DatabaseManagement);
    // db前処理
    await dbm.queryRunnerConnect("./db.sqlite");
  });

  describe('findAll', () => {
    it('should find some entity', async () => {

      const find = await findAll(dbm, SomeEntity);
      console.log(find);
      expect(find).toBeTruthy();
    });
  });

  afterAll(async () => {
    await dbm.queryRunner.rollbackTransaction();
    await dbm.queryRunner.release();
    await dbm.close();
  });
});


