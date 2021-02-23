import Base from 'src/common/entity/base.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import User from '../../users/entities/user.entity';

@Entity()
export default class Scout extends Base {
  @Column({ nullable: true })
  introduction?: string;
  @Column({ default: 'draft' })
  status!: string;
  @Column()
  subject!: string;
  @ManyToMany(() => User, (user) => user.scouts, { cascade: true })
  @JoinTable({ name: 'scout_users' })
  users?: User[];
}
