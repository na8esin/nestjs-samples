import {
  getConnection, createConnection, Connection,
} from 'typeorm';
import { ExpertiseFieldEntity } from '../expertise-fields/expertise-field.entity';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

describe('database', () => {
  let connection: Connection;

  beforeEach(async () => {
    const options: SqliteConnectionOptions = {
      type: "sqlite",
      database: ":memory:",
      entities: [
        ExpertiseFieldEntity
      ],
      synchronize: true,
      logging: true
    };

    connection = await createConnection(options);
  });

  describe('connect', () => {
    it('should return an array of product', async () => {
      let entity = new ExpertiseFieldEntity();
      entity.id = 1;
      entity.name = "得意分野１";

      const queryRunner = await connection.createQueryRunner();
      await queryRunner.connect();

      await queryRunner.startTransaction();

      await queryRunner.manager.save(entity);

      const loaded =
        await queryRunner.manager
          .getRepository(ExpertiseFieldEntity)
          .findOne(1);

      expect(loaded).toEqual({ id: 1, name: "得意分野１" });

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
    });
  });

  afterAll(() => {
    connection.close();
  });
});
