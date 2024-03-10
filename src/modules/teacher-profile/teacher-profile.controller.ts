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
@Auth(Role.SUPERADMIN, Role.ADMIN, Role.TEACHER)
export class TeacherProfileController {
  constructor(private readonly teacherProfileService: TeacherProfileService) {}

  @Post()
  @Auth(Role.SUPERADMIN, Role.ADMIN)
  create(@Body() createTeacherProfileDto: CreateTeacherProfileDto) {
    return this.teacherProfileService.create(createTeacherProfileDto);
  }

  @Get()
  @Auth(Role.SUPERADMIN, Role.ADMIN)
  findAll() {
    return this.teacherProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherProfileService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeacherProfileDto: UpdateTeacherProfileDto,
    @User() user: User,
  ) {
    return this.teacherProfileService.update(id, updateTeacherProfileDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: User) {
    return this.teacherProfileService.remove(id, user);
  }
}
