import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { ConnectionOptions } from 'typeorm';
import { RedisModuleOptions }
  from '@nestjsplus/ioredis/dist/interfaces/redis-module-options.interface';
import { TypeormLogger } from '../typeorm.logger';


export interface EnvConfig {
  [key: string]: any;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(3000),
      API_AUTH_ENABLED: Joi.boolean().required(),
      DATABASE_TYPE: Joi.string(),
      DATABASE_HOST: Joi.string(),
      DATABASE_PORT: Joi.number(),
      DATABASE_USER: Joi.string(),
      DATABASE_PASSWORD: Joi.string(),
      DATABASE_LOGGING: Joi.boolean(),
      DATABASE_ENTITIES: Joi.string(),
      DATABASE_SYNCHRONIZE: Joi.boolean().required(),
      REDIS_HOST: Joi.string(),
      REDIS_PORT: Joi.number(),
      REDIS_DB: Joi.number(),
      PRIVATE_API_BASEURL: Joi.string(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
  getBoolean(key: string): boolean {
    return this.envConfig[key] as boolean;
  }

  getRedisOptions(): RedisModuleOptions {
    return {
      host: this.get('REDIS_HOST'),
      port: parseInt(this.get('REDIS_PORT')),
      db: parseInt(this.get('REDIS_DB')),
    }
  }

  getConnectionOptions(databaseName: string): ConnectionOptions {
    return {
      type: this.get('DATABASE_TYPE') as 'mysql' | 'sqlite',
      host: this.get('DATABASE_HOST'),
      port: parseInt(this.get('DATABASE_PORT')),
      username: this.get('DATABASE_USER'),
      password: this.get('DATABASE_PASSWORD'),
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}'
      ],
      synchronize: this.getBoolean('DATABASE_SYNCHRONIZE'),
      logging: true,
      database: databaseName,
      logger: new TypeormLogger()
    };
  }
}
