import { DB_Model } from '@sc-enums/model';
import { TEMPLATE } from '@sc-enums/template';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: DB_Model.MAILER })
export class Mailer {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column({ type: 'varchar', length: 255 })
  subject: string;
  @Column({ type: 'text' })
  body: string;
  @Column({ type: 'varchar', length: 255 })
  to: string;
  @Column({ type: 'enum', enum: TEMPLATE })
  template: TEMPLATE;
  @CreateDateColumn()
  createdAt: Date;
}
