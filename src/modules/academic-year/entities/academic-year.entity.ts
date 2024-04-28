import { DB_Model } from '@sc-enums/model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_Model.ACADEMIC_YEAR })
export class AcademicYear {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: String,
    unique: true,
    default: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
  })
  academicYear: string;
  @Column({ default: true })
  current: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
