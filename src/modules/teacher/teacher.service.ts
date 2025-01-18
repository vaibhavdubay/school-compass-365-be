import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { Teacher } from './entities/teacher.entity';
import { DataSource } from 'typeorm';
import { Role } from '@sc-enums/role';
import { User } from '@sc-modules/users/entities/user.entity';
import { UserProfile } from '@sc-decorators/user-profile';
import { ImageService } from '@sc-modules/image/image.service';
import { NotifyService } from '@sc-modules/notify/notify.service';
import { TEMPLATE } from '@sc-enums/template';

@Injectable()
export class TeacherService extends BaseRepository<
  Teacher,
  CreateTeacherDto,
  UpdateTeacherDto
> {
  constructor(
    readonly dataSource: DataSource,
    private readonly imageService: ImageService,
    private readonly notifyService: NotifyService,
  ) {
    super(Teacher, dataSource.createEntityManager());
  }

  async createTeacher(
    dto: CreateTeacherDto,
    _user: UserProfile,
    file: Express.Multer.File,
  ): Promise<Teacher> {
    if (typeof dto.subjects == 'string') {
      dto.subjects = JSON.parse(dto.subjects || '[]');
    }
    if (typeof dto.teachersEducation == 'string') {
      dto['teachersEducation'] = JSON.parse(dto.teachersEducation);
    }
    if (typeof dto.teachersExperience == 'string') {
      dto['teachersExperience'] = JSON.parse(dto.teachersExperience);
    }
    const user = new User();
    Object.assign(user, {
      name: `${dto.firstName} ${dto.lastName}`,
      email: dto.email,
      userName: dto.userName,
      password: dto.password,
      role: Role.TEACHER,
    });
    const teacher = new Teacher();
    Object.assign(teacher, {
      ...dto,
      user,
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
        role: Role.TEACHER,
        name: `${dto.firstName} ${dto.lastName}`,
      },
    });
    try {
      const teacherProfile = await this.save(teacher);
      email.then();
      if (file) {
        this.imageService.updateProfileImage(teacherProfile, file);
        this.save(teacherProfile).then();
      }
      return teacherProfile;
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async updateTeacherProfile(
    id: string,
    dto: UpdateTeacherDto,
    file: Express.Multer.File,
  ) {
    if (file) {
      if (typeof dto.subjects == 'string') {
        dto.subjects = JSON.parse(dto.subjects || '[]');
      }
      if (typeof dto.teachersEducation == 'string') {
        dto['teachersEducation'] = JSON.parse(dto.teachersEducation);
      }
      if (typeof dto.teachersExperience == 'string') {
        dto['teachersExperience'] = JSON.parse(dto.teachersExperience);
      }
      const user = await this.updateDocument(id, dto);
      this.imageService.updateProfileImage(user, file);
      this.save(user).then();
      return user;
    } else {
      return this.updateDocument(id, dto);
    }
  }
}
