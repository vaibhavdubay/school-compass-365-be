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

@Entity({ name: DB_Model.TEACHERS_EXPERIENCES })
export class TeachersExperience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => School)
  @JoinColumn({ name: 'schoolId' })
  school: School;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @Column({ type: 'varchar' })
  institute: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'boolean', default: false })
  currentlyTeaching: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
