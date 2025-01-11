import { DB_Model } from '@sc-enums/model';
import { School } from '@sc-modules/school/entities/school.entity';
import { Teacher } from '@sc-modules/teacher/entities/teacher.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_Model.TEACHERS_EDUCATION })
export class TeachersEducation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => School)
  @JoinColumn({ name: 'schoolId' })
  school: School;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @Column({ type: 'varchar', length: 100 })
  institution: string;

  @Column({ type: 'varchar', length: 100 })
  degree: string;

  @Column({ type: 'varchar', length: 100 })
  fieldOfStudy: string;

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
