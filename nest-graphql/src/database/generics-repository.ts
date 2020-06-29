import { DatabaseManagement } from "./database-management";
import {
  EntitySchema, ObjectType, Repository, ObjectLiteral
} from "typeorm";
import { notDeleted, newShowAt } from "../common/typeorm";
import { Injectable, BadRequestException } from "@nestjs/common";

export interface MyObjectLiteral {
  [key: string]: any;
  showAt?: number;
  modified?: Date;
  created?: Date;
}

// Entityが何かと言われても、Entityでしかない。
// デコレータチェックが静的にできればいいけど
// TODO 現在のところ全テーブルにidはあるのでそれも型で表したい
@Injectable()
export class GenericsRepository<Entity extends MyObjectLiteral> {
  constructor(
    private readonly dbm: DatabaseManagement,
    private readonly entity: (new () => Entity)
  ) { }

  getRepository(): Repository<Entity> {
    return this.dbm.getRepository(this.entity);
  }

  // find系はオーバーロードできるけど分岐処理が発生するので
  // どのみちその分のテストは必要
  async findAll(): Promise<Entity[]> {
    return await this.getRepository()
      .find({ where: notDeleted });
  }

  async findOne(id: number): Promise<Entity> {
    return await this.getRepository()
      .findOne(id, { where: notDeleted });
  }

  async findByIds(ids: number[]): Promise<Entity[]> {
    return await this.getRepository()
      .findByIds(ids, { where: notDeleted });
  }

  // 順番を整えて、不足分はnullを返す
  mappedFindByIds = async (ids: number[]): Promise<Entity[]> => {
    const entites = await this.findByIds(ids);
    return ids.map(
      id => entites.find(e => e.id === id) || null
    );
  }

  async create(dto: Entity) {
    dto.showAt = await newShowAt(this.getRepository());
    dto.modified = new Date();
    dto.created = new Date();
    return await this.save(dto);
  }

  // 更新または論理削除
  // 存在しないidの場合は、例外を返す
  // reload:true だと更新した値しか取れないので
  // falseにして、独自に取得
  async update(dto: Entity): Promise<Entity> {
    if (!await this.findOne(dto.id)) {
      const message = `ID(${dto.id}) not found`;
      throw new BadRequestException(message);
    }
    dto.modified = new Date();
    const saved
      = await this.getRepository()
        .save(
          Object.assign(new this.entity, dto)
          , { reload: false });
    return this.getRepository()
      .findOne(dto.id);
  }

  // insertのみ
  async save(dto: Entity): Promise<Entity> {
    const saved
      = await this.getRepository()
        .save(
          Object.assign(new this.entity, dto));
    return saved;
  }
}
