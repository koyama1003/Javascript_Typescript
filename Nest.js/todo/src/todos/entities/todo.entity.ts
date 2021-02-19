import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsNotEmpty()
  title: string;
  @Column()
  @IsNotEmpty()
  body: string;
  @CreateDateColumn()
  readonly createdAt?: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
