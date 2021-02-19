import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TestObject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attr1: string;
}
