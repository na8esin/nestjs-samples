import { DatabaseManagement } from "./database-management";
import { ObjectType, EntitySchema } from "typeorm";
import { notDeleted } from "../common/typeorm";

// さらにdbmをインジェクションするクラスがあれば
// 引数を減らせる
export async function findAll<Entity>(
  dbm: DatabaseManagement,
  target: ObjectType<Entity> | EntitySchema<Entity> | string)
  : Promise<Entity[]> {
  return await dbm
    .getRepository(target)
    .find({ where: notDeleted });
}
