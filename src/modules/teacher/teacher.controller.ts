import {
  Controller,
  Get,
  Post,
  Body,
  Put,
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

@Controller('teacher')
@ApiTags('Teacher')
@Auth('all')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  @FileUpload(CreateTeacherDto, 'image')
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTeacherDto: CreateTeacherDto,
    @UserProfile() userProfile: UserProfile,
  ) {
    return this.teacherService.createTeacher(
      createTeacherDto,
      userProfile,
      file,
    );
  }

  @Get()
  findAll(@UserProfile() userProfile: UserProfile) {
    const id = userProfile.school.id;
    return this.teacherService.find({ where: id ? { school: { id } } : {} });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findById(id);
  }

  @Put(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN, Role.TEACHER)
  @FileUpload(UpdateTeacherDto, 'image')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.teacherService.updateTeacherProfile(id, updateTeacherDto, file);
  }

  @Delete(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.teacherService.softDelete({ id });
  }
}
