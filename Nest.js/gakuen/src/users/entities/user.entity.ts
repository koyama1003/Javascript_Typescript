import { Entity, Column, ManyToMany } from 'typeorm';
import Base from '../../common/entity/base.entity';
import Scout from '../../scouts/entities/scout.entity';

export enum Status {
  available = 'available',
  ADMIN = 'admin',
  EDITOR = 'editor',
  GHOST = 'ghost',
}
@Entity()
export default class User extends Base {
  @Column()
  name!: string;
  @Column()
  name_kana!: string;
  @Column()
  name_roma!: string;
  @Column()
  display_name!: string;
  @Column({ type: 'enum', enum: Status, default: Status.available })
  status!: Status;
  @Column({
    unique: true,
  })
  phone!: string;
  @Column({
    nullable: true,
  })
  birthday?: Date;
  @Column({
    nullable: true,
  })
  gender?: string;
  @Column({
    nullable: true,
  })
  employment_status?: string;
  @Column({
    nullable: true,
  })
  memo?: string;
  @Column({
    nullable: true,
  })
  job_type?: string;

  @ManyToMany((type) => Scout, (scout) => scout.users)
  scouts?: Scout[];
}
