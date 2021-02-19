import { Todo } from 'src/todos/entities/todo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
