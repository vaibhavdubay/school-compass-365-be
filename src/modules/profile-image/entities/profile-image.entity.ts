import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_Model.PROFILE_IMAGE })
export class ProfileImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  filename: string;

  @Column({ enum: Role, type: 'enum' })
  role: Role;

  @Column()
  originalName: string;

  @Column({})
  url: string;

  @Column({})
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
