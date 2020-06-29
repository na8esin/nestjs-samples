import { Repository, SelectQueryBuilder, ObjectType, EntitySchema } from "typeorm";

export type Max = { max: number }

export async function newShowAt<T>(repo: Repository<T>)
  : Promise<number> {
  const max: Max = await repo
    .createQueryBuilder()
    .select("MAX(show_at)", "max")
    .getRawOne();
  return max.max ? max.max + 1 : 1;
}

export function deleteFlg<Entity>(select: SelectQueryBuilder<Entity>) {
  // ここの文字列だけ共通化できればいいか？
  return select.where('delete_flg = 0');
}

export const notDeleted = { deleteFlg: 0 }
// 他に条件があったとき、マージするのが面倒
export const notDeletedCondition = { where: { deleteFlg: 0 } }

// 案1、リポジトリを作る
// 案2、findメソッドに自作のデコレータをつける
//      すべてのfindメソッドにつけないといけないからやっぱり面倒
// 理想は、selectの場合に暗黙的に必ずフラグがつくような状態がいい
//    -> なさそうなので、とりあえず、妥協

export function dtoToEntity<Entity>
  (c: { new(): Entity },
    dto: Entity)
  : Entity {
  return Object.assign(new c(), dto);
}
