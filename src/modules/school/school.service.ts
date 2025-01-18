import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
import { completeAcademicYear } from 'src/core/queries/complete-academic-year.query';

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
      address,
      town,
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
      address,
      town,
      email,
      phoneNumber,
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

    try {
      const adminProfile = await this.adminService.save(admin);
      await this.notifyService.prepareEmail({
        template: TEMPLATE.ACCOUNT_REGISTRATION,
        to: email,
        subject: `Welcome, ${firstName}! Confirm Your SchoolCompass365 Account & Start Exploring`,
        data: {
          userName,
          password,
          schoolName,
          role: Role.ADMIN,
          name: `${firstName} ${lastName}`,
        },
      });
      return adminProfile;
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async completeAcademicYear(schoolId: string) {
    const currentAcademicYear = await this.academicService.findOneBy({
      current: true,
    });
    await this.save({ id: schoolId, currentAcademicYear });
    return this.query(completeAcademicYear(schoolId, currentAcademicYear.id));
  }
}
