import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export default abstract class Base {
  @PrimaryGeneratedColumn()
  readonly id!: number;
  @CreateDateColumn()
  readonly created_at!: Date;
  @UpdateDateColumn({ nullable: true })
  readonly updated_at?: Date;
  @DeleteDateColumn({ nullable: true })
  readonly deleted_at?: Date;
  @Column({ nullable: true })
  creator_id!: number;
  @Column({ nullable: true })
  updator_id!: number;
  @Column({ nullable: true })
  deleter_id?: number;
}
