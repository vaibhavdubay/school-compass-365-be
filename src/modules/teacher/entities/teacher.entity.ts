import { DB_Model } from '@sc-enums/model';
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

@Entity({ name: DB_Model.TEACHER })
export class Teacher {
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

  @Column({ type: String })
  phoneNumber: string;

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
