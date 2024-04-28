import { DB_Model } from '@sc-enums/model';
import { AcademicYear } from '@sc-modules/academic-year/entities/academic-year.entity';
import { Class } from '@sc-modules/class/entities/class.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_Model.SCHOOL })
export class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ default: new Date().getFullYear() })
  establishedYear: number;
  @Column()
  address1: string;
  @Column({ nullable: true })
  address2: string;
  @ManyToMany(() => AcademicYear)
  @JoinTable({
    name: 'school_academic',
    joinColumn: { name: 'school_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'academic_id', referencedColumnName: 'id' },
  })
  academicYears: AcademicYear[];
  @ManyToMany(() => AcademicYear, (academicYear) => academicYear.id)
  @JoinColumn()
  currentAcademicYear: AcademicYear;
  @Column()
  city: string;
  @Column()
  state: string;
  @Column()
  pincode: number;
  @Column({ unique: true })
  schoolDISECode: string;
  @Column({ unique: true })
  schoolCode: string;
  @ManyToMany(() => Class)
  @JoinTable({
    name: 'school_class',
    joinColumn: { name: 'school_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'class_id', referencedColumnName: 'id' },
  })
  classes: Class[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
