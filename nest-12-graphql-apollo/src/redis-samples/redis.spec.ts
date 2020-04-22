import { Test } from "@nestjs/testing";
import { RedisModule, RedisService } from "@nestjsplus/ioredis";
import { AppRedisService } from "./app-redis.service";

describe("redis", () => {
  let appRedisService: AppRedisService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        RedisModule.register({
          port: 6379,
          host: "127.0.0.1",
          db: 0
        })
      ],
      providers: [AppRedisService]
    }).compile();

    appRedisService = module.get<AppRedisService>(AppRedisService);
    redisService = module.get<RedisService>(RedisService);
  });

  describe("set and get", () => {
    it("should return an array of appRedisService", async () => {
      appRedisService.set("demo", "Secret");
      console.log(await appRedisService.get("demo", "Secre"));

      redisService.client.hmset("hoge", { key1: 1, key2: 2 });
      console.log(await redisService.client.hgetall("hoge"));

      // フィールドで検索できないの？
    });
  });
});
