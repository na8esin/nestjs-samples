import { Min } from "class-validator";

export class UserEntity {
    @Min(1)
    id: number
}