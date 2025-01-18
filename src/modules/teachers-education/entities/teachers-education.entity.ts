import { DB_Model } from '@sc-enums/model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_Model.TEACHERS_EDUCATION })
export class TeachersEducation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  institution: string;

  @Column({ type: 'varchar', length: 100 })
  level_of_education: string;

  @Column({ type: 'varchar', length: 100 })
  field_of_study: string;

  @Column({ type: 'varchar', length: 100 })
  passingYear: string;

  @Column({ type: 'varchar', length: 100 })
  gpa: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
