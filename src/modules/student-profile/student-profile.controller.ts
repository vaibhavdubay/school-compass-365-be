import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentProfileService } from './student-profile.service';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { User } from '@sc-decorators/user';

@Controller('student-profile')
@ApiTags('Student Profile')
@Auth(Role.SUPERADMIN, Role.ADMIN, Role.STUDENT)
export class StudentProfileController {
  constructor(private readonly studentProfileService: StudentProfileService) {}

  @Post()
  @Auth(Role.SUPERADMIN, Role.ADMIN)
  create(@Body() createStudentProfileDto: CreateStudentProfileDto) {
    return this.studentProfileService.create(createStudentProfileDto);
  }

  @Get()
  @Auth(Role.SUPERADMIN, Role.ADMIN)
  findAll() {
    return this.studentProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentProfileService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentProfile: UpdateStudentProfileDto,
    @User() user: User,
  ) {
    return this.studentProfileService.update(id, updateStudentProfile, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: User) {
    return this.studentProfileService.remove(id, user);
  }
}
