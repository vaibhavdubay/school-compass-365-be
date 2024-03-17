import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TeacherProfileService } from './teacher-profile.service';
import { CreateTeacherProfileDto } from './dto/create-teacher-profile.dto';
import { UpdateTeacherProfileDto } from './dto/update-teacher-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { User } from '@sc-decorators/user';

@Controller('teacher-profile')
@ApiTags('Teacher Profile')
@Auth(...Object.values(Role))
export class TeacherProfileController {
  constructor(private readonly teacherProfileService: TeacherProfileService) {}

  @Post()
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  create(
    @Body() createTeacherProfileDto: CreateTeacherProfileDto,
    @User() user: User,
  ) {
    return this.teacherProfileService.create(createTeacherProfileDto, {
      schoolId: user.schoolId,
      academicYear: user.school.currentAcademicYear,
    });
  }

  @Get()
  findAll(@User() user: User) {
    return this.teacherProfileService.findAll({ schoolId: user.schoolId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherProfileService.findById(id);
  }

  @Put(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  update(
    @Param('id') id: string,
    @Body() updateTeacherProfileDto: UpdateTeacherProfileDto,
    @User() user: User,
  ) {
    return this.teacherProfileService.update(id, updateTeacherProfileDto, user);
  }

  @Delete(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id') id: string, @User() user: User) {
    return this.teacherProfileService.remove(id, user);
  }
}
