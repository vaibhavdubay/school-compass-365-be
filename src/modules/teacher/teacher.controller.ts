import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { UserProfile } from '@sc-decorators/user-profile';
import { FileUpload } from '@sc-decorators/file-upload';
import { ImageService } from '@sc-modules/image/image.service';

@Controller('teacher')
@ApiTags('Teacher')
@Auth('all')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  @FileUpload(CreateTeacherDto, 'image')
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTeacherDto: CreateTeacherDto,
    @UserProfile() userProfile: UserProfile,
  ) {
    createTeacherDto['school'] = userProfile.school;
    createTeacherDto['academicYears'] = [
      userProfile.school.currentAcademicYear,
    ];
    if (file) {
      const user = await this.teacherService.createDocument(createTeacherDto);
      this.imageService.updateProfileImage(user, file);
      this.teacherService.save(user).then();
      return user;
    } else {
      return this.teacherService.createTeacher(createTeacherDto);
    }
  }

  @Get()
  findAll(@UserProfile() userProfile: UserProfile) {
    return this.teacherService.find({ where: { school: userProfile.school } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findById(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN, Role.TEACHER)
  @FileUpload(UpdateTeacherDto, 'image')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const user = await this.teacherService.updateDocument(
        id,
        updateTeacherDto,
      );
      this.imageService.updateProfileImage(user, file);
      this.teacherService.save(user).then();
      return user;
    } else {
      return this.teacherService.updateDocument(id, updateTeacherDto);
    }
  }

  @Delete(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.teacherService.softDelete({ id });
  }
}
