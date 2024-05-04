import { GENDER } from '@sc-enums/gender';
import { DB_Model } from '@sc-enums/model';
import { Image } from '@sc-modules/image/entities/image.entity';
import { School } from '@sc-modules/school/entities/school.entity';
import { User } from '@sc-modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_Model.ADMIN })
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => School, { cascade: true, eager: true })
  @JoinColumn({ name: 'schoolId' })
  school: School;

  @Column({ type: String, length: 30 })
  firstName: string;

  @Column({ type: String, length: 30 })
  lastName: string;

  @Column({ type: 'enum', enum: GENDER })
  gender: GENDER;

  @Column({
    unique: true,
    type: String,
    length: 50,
  })
  email: string;

  @Column({ type: String, length: 10 })
  phoneNumber: string;

  @OneToOne(() => Image, (image) => image.userId, { nullable: true })
  @JoinColumn({ name: 'profileImageId' })
  profileImage: Image;

  @Column({ nullable: true })
  profileImageUrl: string;

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
