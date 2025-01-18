import { DB_Model, Supporter_Model } from '@sc-enums/model';
import { AcademicYear } from '@sc-modules/academic-year/entities/academic-year.entity';
import { Class } from '@sc-modules/class/entities/class.entity';
import { Image } from '@sc-modules/image/entities/image.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: DB_Model.SCHOOL })
export class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  phoneNumber: string;
  @Column({ default: new Date().getFullYear() })
  establishedYear: number;
  @Column()
  address: string;
  @ManyToMany(() => AcademicYear)
  @JoinTable({
    name: Supporter_Model.SCHOOL_ACADEMIC,
    joinColumn: { name: 'school_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'academic_id', referencedColumnName: 'id' },
  })
  academicYears: AcademicYear[];
  @OneToOne(() => Image, (image) => image.userId, {
    nullable: true,
  })
  @JoinColumn({ name: 'schoolLogoId' })
  logo: Image;
  @Column({
    nullable: true,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        const host = process.env.HOST_URL || '';
        return value ? `${host}/images${value}` : null;
      },
    },
  })
  logoUrl: string;
  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.id, {
    eager: true,
  })
  @JoinColumn()
  currentAcademicYear: AcademicYear;
  @Column()
  city: string;
  @Column()
  town: string;
  @Column()
  state: string;
  @Column({
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return value ? `${value}` : '';
      },
    },
  })
  pincode: number;
  @Column({ unique: true })
  schoolDISECode: string;
  @Column({ unique: true })
  schoolCode: string;
  @ManyToMany(() => Class, { eager: true })
  @JoinTable({
    name: Supporter_Model.SCHOOL_CLASS,
    joinColumn: { name: 'school_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'class_id', referencedColumnName: 'id' },
  })
  classes: Class[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
