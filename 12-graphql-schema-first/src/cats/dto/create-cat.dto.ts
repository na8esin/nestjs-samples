import { Min, Max } from 'class-validator';
import { CreateCatInput } from '../../graphql.schema';

export class CreateCatDto extends CreateCatInput {
  @Min(1)
  @Max(99)
  age: number;
}
