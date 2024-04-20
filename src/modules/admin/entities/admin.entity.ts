import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
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
  password: string;

  @Column({ update: false, type: 'enum', enum: Role, default: Role.ADMIN })
  role: Role;

  @Column({
    unique: true,
    type: String,
  })
  userName: string;

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
