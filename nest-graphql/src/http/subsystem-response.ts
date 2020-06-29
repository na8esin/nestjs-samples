import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

// ApiDatasorceかmicorserviceかsubsystem
export class SubsystemResponse<T> {
  readonly errors: any;
  constructor(
    private readonly args: T,
    private readonly response: any
  ) {
    const { errors } = this.response;
    this.errors = errors;
  }

  // 名称はhasErrorくらいでもいいか？
  validate() {
    if (Object.keys(this.errors).length !== 0) {
      throw new BadRequestException(this.factory());
    }
  }

  factory(): ValidationError[] {
    const validationErrors = new Array<ValidationError>();
    for (const error in this.errors) {
      validationErrors.push(
        this.validationErrorCreate(this.args[error], error),
      );
    }
    return validationErrors;
  }

  validationErrorCreate(
    value,
    property,
    constraints?: { [type: string]: string },
  ): ValidationError {
    const validationError = new ValidationError();
    // 全入力値。リクエストの値をそのまま代入したい
    validationError.target = this.args;
    // エラーが発生しているプロパティ名
    validationError.property = property;
    // エラーが発生しているプロパティの値
    validationError.value = value;
    validationError.children = []; // 基本は空
    validationError.constraints = { maxLength: '5', format: 'yyyy-mm-dd' };

    return validationError;
  }
}
