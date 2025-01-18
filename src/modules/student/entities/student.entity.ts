import { ACADEMIC_STATUS } from '@sc-enums/academicStatus';
import { BLOOD_GROUP } from '@sc-enums/bloodGroup';
import { GENDER } from '@sc-enums/gender';
import { DB_Model, Supporter_Model } from '@sc-enums/model';
import { AcademicYear } from '@sc-modules/academic-year/entities/academic-year.entity';
import { Class } from '@sc-modules/class/entities/class.entity';
import { ParentOrGuardian } from '@sc-modules/parent-or-guardians/entities/parent-or-guardian.entity';
import { Image } from '@sc-modules/image/entities/image.entity';
import { School } from '@sc-modules/school/entities/school.entity';
import { User } from '@sc-modules/users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  Entity,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity({ name: DB_Model.STUDENT })
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => School, { eager: true })
  @JoinColumn({ name: 'schoolId' })
  school: School;

  @ManyToOne(() => Class, { eager: true })
  @JoinColumn({ name: 'classId' })
  class: Class;

  @Column({ nullable: true })
  classSection: string = '';

  @Column({ type: String })
  firstName: string;

  @Column({ type: String })
  lastName: string;

  @Column({
    unique: true,
    type: String,
  })
  email: string;

  @Column({ type: String })
  phoneNumber: string;

  @Column({ unique: true })
  pen: string;

  @Column({
    type: 'enum',
    enum: ACADEMIC_STATUS,
    default: ACADEMIC_STATUS.ACTIVE,
  })
  academicStatus: ACADEMIC_STATUS;

  @Column({
    type: 'datetime',
  })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: GENDER,
  })
  gender: GENDER;

  @Column({
    type: 'enum',
    enum: BLOOD_GROUP,
    nullable: true,
  })
  bloodGroup: BLOOD_GROUP;

  @OneToOne(() => Image, (image) => image.userId, {
    nullable: true,
  })
  @JoinColumn({ name: 'profileImageId' })
  profileImage: Image;

  @Column({
    nullable: true,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        const host = process.env.HOST_URL || '';
        return value ? `${host}/images${value}` : null;
      },
    },
  })
  profileImageUrl: string;

  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => AcademicYear, { eager: true })
  @JoinTable({
    name: Supporter_Model.STUDENTS_ACADEMICS,
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'academic_id', referencedColumnName: 'id' },
  })
  academicYears: AcademicYear[];

  @ManyToMany(() => ParentOrGuardian, { cascade: true, eager: true })
  @JoinTable({
    name: Supporter_Model.STUDENT_WITH_PARENTS_GUARDIANS,
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'parents_or_guardians_id',
      referencedColumnName: 'id',
    },
  })
  parentsGuardians: ParentOrGuardian[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
