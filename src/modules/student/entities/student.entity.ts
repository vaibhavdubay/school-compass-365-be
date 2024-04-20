import { ACADEMIC_STATUS } from '@sc-enums/academicStatus';
import { BLOOD_GROUP } from '@sc-enums/bloodGroup';
import { GENDER } from '@sc-enums/gender';
import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import { ProfileImage } from '@sc-modules/profile-image/entities/profile-image.entity';
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
} from 'typeorm';

@Entity({ name: DB_Model.STUDENT })
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  firstName: string;

  @Column({ type: String })
  lastName: string;

  @Column({
    unique: true,
    type: String,
  })
  email: string;

  @Column({ update: false, type: 'enum', enum: Role, default: Role.ADMIN })
  role: Role;

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
  })
  BLOOD_GROUP: BLOOD_GROUP;

  @OneToOne(() => ProfileImage, (image) => image.userId)
  @JoinColumn({ name: 'profileImageId' })
  profileImage: ProfileImage;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
