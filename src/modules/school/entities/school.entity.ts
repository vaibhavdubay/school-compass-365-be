import { DB_Model } from '@sc-enums/model';
import { Class } from '@sc-modules/class/entities/class.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
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

  //   @OneToMany(())
  //   academicYears: string[];

  //   @Column()
  //   currentAcademicYear: string;

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
}
