import { GENDER } from '@sc-enums/gender';
import { DB_Model } from '@sc-enums/model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_Model.PARENTS_OR_GUARDIAN })
export class ParentOrGuardian {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ type: 'enum', enum: GENDER })
  gender: GENDER;
  @Column()
  relations: string;
  @Column()
  contactEmail: string;
  @Column()
  contactPhone: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
