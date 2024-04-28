import { GENDER } from '@sc-enums/gender';
import { DB_Model } from '@sc-enums/model';
import { ProfileImage } from '@sc-modules/profile-image/entities/profile-image.entity';
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

  @OneToOne(() => ProfileImage, (image) => image.userId, { nullable: true })
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
