import { GENDER } from '@sc-enums/gender';
import { DB_Model } from '@sc-enums/model';
import { AcademicYear } from '@sc-modules/academic-year/entities/academic-year.entity';
import { ProfileImage } from '@sc-modules/profile-image/entities/profile-image.entity';
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
    name: 'teacher_academics',
    joinColumn: { name: 'teacher_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'academic_id', referencedColumnName: 'id' },
  })
  academicYears: AcademicYear[];

  @OneToOne(() => ProfileImage, (image) => image.userId, { eager: true })
  @JoinColumn({ name: 'profileImageId' })
  profileImage: ProfileImage;

  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
