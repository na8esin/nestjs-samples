import { ExpertiseFieldEntity } from '../expertise-fields/expertise-field.entity';
import { DatabaseManagement } from './database-management';
import { Test } from '@nestjs/testing/test';
import { ConfigModule } from '../config/config-module';

describe('database', () => {
  // これもリクエストスコープでもこのテストは成功する
  let databaseManagement: DatabaseManagement;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();
    databaseManagement = moduleRef.get<DatabaseManagement>(DatabaseManagement);
  });

  describe('connect', () => {
    it('should return an array of Expertise Field', async () => {
      let entity = new ExpertiseFieldEntity();
      entity.id = 1;
      entity.name = "得意分野１";

      await databaseManagement.queryRunnerConnect(":memory:");
      await databaseManagement.getQueryManager().save(entity);

      const loaded =
        await databaseManagement.getQueryManager()
          .getRepository(ExpertiseFieldEntity)
          .findOne(1);

      expect(loaded).toEqual({ id: 1, name: "得意分野１" });

      await databaseManagement.queryRunner.release();
    });
  });

  afterAll(async () => {
    await databaseManagement.close();
  });
});
