import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import { getRounds, hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_Model.USER })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ unique: true, length: 100 })
  userName: string;

  @Column({ length: 100 })
  password: string;

  @Column({ type: 'enum', enum: Role, update: false })
  role: Role;

  @Column({ type: 'boolean', default: true })
  changePassword: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try {
      const rounds = getRounds(this.password);
      if (rounds !== 11) this.password = await hash(this.password, 11);
    } catch (error) {
      this.password = await hash(this.password, 11);
    }
  }
}
