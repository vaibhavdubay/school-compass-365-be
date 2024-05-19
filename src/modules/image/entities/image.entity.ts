import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_Model.IMAGE })
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({})
  filename: string;

  @Column({ enum: Role, type: 'enum' })
  role: Role;

  @Column()
  mimeType: string;

  @Column({ type: 'longblob' })
  buffer: Buffer;

  @Column({})
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
