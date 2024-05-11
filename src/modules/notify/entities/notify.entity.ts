import { DB_Model, Supporter_Model } from '@sc-enums/model';
import { NOTIFICATION_STATUS } from '@sc-enums/notificationStatus';
import { User } from '@sc-modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_Model.NOTIFY })
export class Notify {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: Supporter_Model.USER_NOTIFY,
    joinColumn: { name: 'notification_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  user: User;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  type: string;

  @Column({ default: NOTIFICATION_STATUS.PENDING })
  status: NOTIFICATION_STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
