import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { UserProfile } from '@sc-decorators/user-profile';

@Controller('teacher')
@ApiTags('Teacher')
@Auth('all')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  create(
    @Body() createTeacherDto: CreateTeacherDto,
    @UserProfile() userProfile: UserProfile,
  ) {
    createTeacherDto['school'] = userProfile.school;
    createTeacherDto['academicYears'] = [
      userProfile.school.currentAcademicYear,
    ];
    return this.teacherService.createTeacher(createTeacherDto);
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
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.updateDocument(id, updateTeacherDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.teacherService.softDelete({ id });
  }
}
