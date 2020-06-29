import { Logger, QueryRunner } from "typeorm";
let winston = require('winston');
require('winston-daily-rotate-file');

export class TypeormLogger implements Logger {
  private readonly logger;
  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'logs/query-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          // アプリケーション全体でシングルトンっぽいから使ってないやつを指定
          // でもverboseってdebugも出力されるイメージだったけどそんなことない
          level: 'verbose',
          format: winston.format.combine(
            winston.format.timestamp(),
          ),
        }),
      ]
    });
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.log({
      // 何か指定しないとエラーが出る
      level: 'verbose',
      message: `query: ${query} -- PARAMETERS:[${parameters}]`
    });
  }
  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    throw new Error("Method not implemented.");
  }
  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    throw new Error("Method not implemented.");
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    throw new Error("Method not implemented.");
  }
  logMigration(message: string, queryRunner?: QueryRunner) {
    throw new Error("Method not implemented.");
  }
  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
    this.logger.log({
      level: 'verbose',
      message
    });
  }
}
