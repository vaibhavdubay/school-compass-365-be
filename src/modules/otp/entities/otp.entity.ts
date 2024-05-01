import { DB_Model } from '@sc-enums/model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: DB_Model.OTP })
export class OTP {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  otp: string;

  @Column()
  user_id: string;

  @Column()
  expires: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
