import { DB_Model } from '@sc-enums/model';
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

@Entity({ name: DB_Model.CLASS })
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  className: string;

  @OneToOne(() => Class)
  @JoinColumn()
  nextClass: string;

  @Column()
  order: number;

  @Column({ default: false })
  streamsRequired: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
