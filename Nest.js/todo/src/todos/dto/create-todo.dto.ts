export class CreateTodoDto {
  title: string;
  body: string;
  userId?: number;
  readonly createdAt?: Date;
}
