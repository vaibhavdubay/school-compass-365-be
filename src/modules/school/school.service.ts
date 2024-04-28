import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { DataSource, In } from 'typeorm';
import { School } from './entities/school.entity';
import { AdminService } from '@sc-modules/admin/admin.service';
import { Role } from '@sc-enums/role';
import { ClassService } from '@sc-modules/class/class.service';
import { User } from '@sc-modules/users/entities/user.entity';
import { Admin } from '@sc-modules/admin/entities/admin.entity';
import { AcademicYearService } from '@sc-modules/academic-year/academic-year.service';
import { NotifyService } from '@sc-modules/notify/notify.service';
import { TEMPLATE } from '@sc-enums/template';

@Injectable()
export class SchoolService extends BaseRepository<
  School,
  CreateSchoolDto,
  UpdateSchoolDto
> {
  constructor(
    readonly dataSource: DataSource,
    private readonly adminService: AdminService,
    private readonly classService: ClassService,
    private readonly academicService: AcademicYearService,
    private readonly notifyService: NotifyService,
  ) {
    super(School, dataSource.createEntityManager());
  }

  async createSchoolProfile(createDto: CreateSchoolDto) {
    const {
      schoolName,
      establishedYear,
      address1,
      address2,
      city,
      state,
      pincode,
      schoolDISECode,
      schoolCode,
      classes,
      firstName,
      lastName,
      email,
      password,
      userName,
      phoneNumber,
      gender,
    } = createDto;

    const classEntities = await this.classService.find({
      where: {
        id: In(classes),
      },
    });

    const currentAcademicYear = await this.academicService.findOneBy({
      current: true,
    });

    const school = this.create();
    Object.assign(school, {
      name: schoolName,
      establishedYear,
      currentAcademicYear,
      academicYears: [currentAcademicYear],
      address1,
      address2,
      city,
      state,
      pincode,
      schoolDISECode,
      schoolCode,
      classes: classEntities,
    });

    const user = new User();
    Object.assign(user, {
      name: `${firstName} ${lastName}`,
      email,
      userName,
      password,
      role: Role.ADMIN,
    });

    const admin = new Admin();
    Object.assign(admin, {
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      user,
      school,
    });

    await this.notifyService.prepareEmail({
      template: TEMPLATE.ACCOUNT_REGISTRATION,
      to: email,
      subject: '',
      data: {
        userName,
        password,
        schoolName,
        role: Role.ADMIN,
        name: `${firstName} ${lastName}`,
      },
    });
    return this.adminService.save(admin);
  }
}
