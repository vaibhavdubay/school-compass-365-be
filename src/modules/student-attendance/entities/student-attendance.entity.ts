import { ATTENDANCE_STATUS } from '@sc-enums/attendanceStatus';
import { AcademicYear } from '@sc-modules/academic-year/entities/academic-year.entity';
import { Class } from '@sc-modules/class/entities/class.entity';
import { School } from '@sc-modules/school/entities/school.entity';
import { Student } from '@sc-modules/student/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class StudentAttendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => School, { eager: true })
  @JoinColumn({ name: 'schoolId' })
  school: School;

  @ManyToOne(() => Student, { eager: true })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ManyToOne(() => AcademicYear, { eager: true })
  @JoinColumn({ name: 'academicYearId' })
  academicYear: AcademicYear;

  @ManyToOne(() => Class, { eager: true })
  @JoinColumn({ name: 'classId' })
  class: Class;

  @Column({
    type: 'enum',
    enum: ATTENDANCE_STATUS,
    default: ATTENDANCE_STATUS.PRESENT,
  })
  attendance: ATTENDANCE_STATUS;

  //   @Prop({
  //     ref: DB_Model.CLASS_SCHEDULE,
  //     type: mongoose.Schema.Types.ObjectId,
  //   })
  //   classScheduleId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
