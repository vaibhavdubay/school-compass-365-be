import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { Student } from './entities/student.entity';
import { DataSource } from 'typeorm';
import { ImageService } from '@sc-modules/image/image.service';
import { UserProfile } from '@sc-decorators/user-profile';
import { User } from '@sc-modules/users/entities/user.entity';
import { Role } from '@sc-enums/role';
import { TEMPLATE } from '@sc-enums/template';
import { NotifyService } from '@sc-modules/notify/notify.service';

@Injectable()
export class StudentService extends BaseRepository<
  Student,
  CreateStudentDto,
  UpdateStudentDto
> {
  constructor(
    readonly dataSource: DataSource,
    private readonly imageService: ImageService,
    private readonly notifyService: NotifyService,
  ) {
    super(Student, dataSource.createEntityManager());
  }

  async createStudentProfile(
    dto: CreateStudentDto,
    _user: UserProfile,
    file: Express.Multer.File,
  ) {
    if (typeof dto.parentsGuardians == 'string') {
      dto['parentsGuardians'] = JSON.parse(dto.parentsGuardians);
    }
    const user = new User();
    Object.assign(user, {
      name: `${dto.firstName} ${dto.lastName}`,
      email: dto.email,
      userName: dto.userName,
      password: dto.password,
      role: Role.STUDENT,
    });
    const student = new Student();
    Object.assign(student, {
      ...dto,
      user,
      class: dto.classId,
      school: _user.school.id,
      academicYears: [_user.school.currentAcademicYear],
    });
    const email = this.notifyService.prepareEmail({
      template: TEMPLATE.ACCOUNT_REGISTRATION,
      to: dto.email,
      subject: `School Compass 365 Login Credentials`,
      data: {
        userName: dto.userName,
        password: dto.password,
        schoolName: _user.school.name,
        role: Role.STUDENT,
        name: `${dto.firstName} ${dto.lastName}`,
      },
    });
    const studentProfile = await this.save(student);
    if (file) {
      this.imageService.updateProfileImage(studentProfile, file);
      this.save(studentProfile).then();
    }
    email.then();
    return studentProfile;
  }

  async updateStudentProfile(
    id: string,
    dto: UpdateStudentDto,
    file: Express.Multer.File,
  ) {
    if (typeof dto.parentsGuardians == 'string')
      dto['parentsGuardians'] = JSON.parse(dto.parentsGuardians);
    if (file) {
      const user = await this.updateDocument(id, {
        ...dto,
        class: dto.classId as any,
      });
      this.imageService.updateProfileImage(user, file);
      this.save(user).then();
      return user;
    } else {
      return this.updateDocument(id, dto);
    }
  }
}
