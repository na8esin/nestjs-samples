import { DatabaseManagement } from "../database/database-management";

export async function deleteAll(dbm: DatabaseManagement, entity) {
  await dbm.getQueryManager()
    .createQueryBuilder()
    .delete()
    .from(entity)
    .execute();
}
