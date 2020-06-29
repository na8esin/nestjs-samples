import { DatabaseManagement } from "../database/database-management";

export async function deleteAll(dbm: DatabaseManagement, entity) {
  await dbm.getQueryManager()
    .createQueryBuilder()
    .delete()
    .from(entity)
    .execute();
}

// argは型情報を持ってない引数を想定している
// transform:trueにすれば不要
// test-helperメソッドにしてもいいな
// テストで使うにしても、ValidationPipe
// の初期化の方法と違うからこれでいいのか？
export function initializeDto<T>(c: { new(): T; }, arg: T): T {
  return Object.assign(new c(), arg);
}
