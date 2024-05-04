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

@Injectable()
export class StudentService extends BaseRepository<
  Student,
  CreateStudentDto,
  UpdateStudentDto
> {
  constructor(
    readonly dataSource: DataSource,
    private readonly imageService: ImageService,
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
      school: _user.school,
      academicYears: [_user.school.currentAcademicYear],
    });
    if (file) {
      const studentProfile = await this.save(student);
      this.imageService.updateProfileImage(studentProfile, file);
      this.save(studentProfile).then();
      return studentProfile;
    } else {
      return this.save(student);
    }
  }

  async updateStudentProfile(
    id: string,
    dto: UpdateStudentDto,
    file: Express.Multer.File,
  ) {
    if (typeof dto.parentsGuardians == 'string')
      dto['parentsGuardians'] = JSON.parse(dto.parentsGuardians);
    if (file) {
      const user = await this.updateDocument(id, dto);
      this.imageService.updateProfileImage(user, file);
      this.save(user).then();
      return user;
    } else {
      return this.updateDocument(id, dto);
    }
  }
}
