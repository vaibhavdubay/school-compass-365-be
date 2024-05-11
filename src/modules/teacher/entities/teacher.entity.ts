import { GENDER } from '@sc-enums/gender';
import { DB_Model, Supporter_Model } from '@sc-enums/model';
import { AcademicYear } from '@sc-modules/academic-year/entities/academic-year.entity';
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

@Entity({ name: DB_Model.TEACHER })
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: GENDER,
  })
  gender: GENDER;

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

  @ManyToMany(() => AcademicYear, { eager: true })
  @JoinTable({
    name: Supporter_Model.TEACHER_ACADEMICS,
    joinColumn: { name: 'teacher_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'academic_id', referencedColumnName: 'id' },
  })
  academicYears: AcademicYear[];

  @OneToOne(() => Image, (image) => image.userId, { nullable: true })
  @JoinColumn({ name: 'profileImageId' })
  profileImage: Image;

  @Column({ nullable: true })
  profileImageUrl: string;

  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'simple-array' })
  subjects: string[];

  @Column()
  years_of_experience: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
