import { ExpertiseFieldEntity } from '../expertise-fields/expertise-field.entity';
import { DatabaseManagement } from './database-management';
import { ConfigService } from '../config/config.service';

describe('database', () => {
  // これがリクエストスコープでもこのテストは成功する
  let databaseManagement: DatabaseManagement;

  beforeEach(async () => {
    databaseManagement = new DatabaseManagement(
      new ConfigService(`src/config/test.env`)
    );
  });

  describe('connect', () => {
    it('should return an array of Expertise Field', async () => {
      let entity = new ExpertiseFieldEntity();
      entity.id = 1;
      entity.name = "得意分野１";

      await databaseManagement.queryRunnerConnect("./db.sqlite");
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
