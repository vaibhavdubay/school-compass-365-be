import { GENDER } from '@sc-enums/gender';
import { DB_Model, Supporter_Model } from '@sc-enums/model';
import { AcademicYear } from '@sc-modules/academic-year/entities/academic-year.entity';
import { Image } from '@sc-modules/image/entities/image.entity';
import { School } from '@sc-modules/school/entities/school.entity';
import { TeachersEducation } from '@sc-modules/teachers-education/entities/teachers-education.entity';
import { TeachersExperience } from '@sc-modules/teachers-experience/entities/teachers-experience.entity';
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

@Entity({ name: DB_Model.TEACHER })
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => School, { eager: true })
  @JoinColumn({ name: 'schoolId' })
  school: School;

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

  @ManyToMany(() => AcademicYear)
  @JoinTable({
    name: Supporter_Model.TEACHER_ACADEMICS,
    joinColumn: { name: 'teacher_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'academic_id', referencedColumnName: 'id' },
  })
  academicYears: AcademicYear[];

  @OneToOne(() => Image, (image) => image.userId, { nullable: true })
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

  @Column({ type: 'simple-array' })
  subjects: string[];

  @Column()
  years_of_experience: number;

  @Column({
    type: 'enum',
    enum: GENDER,
  })
  gender: GENDER;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  town: string;

  @Column()
  state: string;

  @Column({
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return value ? `${value}` : '';
      },
    },
  })
  pincode: number;

  @Column()
  aadhar_number: number;

  @ManyToOne(() => TeachersEducation, (edu) => edu.id, { cascade: true, eager: true } )
  @JoinTable({
    name: Supporter_Model.TEACHER_EDUCATION,
    joinColumn: { name: 'teachers_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'education_id',
      referencedColumnName: 'id',
    },
  })
  teachersEducation: TeachersEducation[];

  @ManyToOne(() => TeachersExperience, (exp) => exp.id, { cascade: true, eager: true })
  @JoinTable({
    name: Supporter_Model.TEACHER_EXPERIENCE,
    joinColumn: { name: 'teachers_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'experience_id',
      referencedColumnName: 'id',
    },
  })
  teachersExperience: TeachersExperience[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
