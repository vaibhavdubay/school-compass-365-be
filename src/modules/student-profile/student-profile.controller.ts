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
@Auth(...Object.values(Role))
export class StudentProfileController {
  constructor(private readonly studentProfileService: StudentProfileService) {}

  @Post()
  @Auth(Role.SUPERADMIN, Role.ADMIN)
  create(@Body() createStudentProfileDto: CreateStudentProfileDto) {
    return this.studentProfileService.create(createStudentProfileDto);
  }

  @Get()
  findAll() {
    return this.studentProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentProfileService.findById(id);
  }

  @Put(':id')
  @Auth(Role.SUPERADMIN, Role.ADMIN, Role.STUDENT)
  update(
    @Param('id') id: string,
    @Body() updateStudentProfile: UpdateStudentProfileDto,
    @User() user: User,
  ) {
    return this.studentProfileService.update(id, updateStudentProfile, user);
  }

  @Delete(':id')
  @Auth(Role.SUPERADMIN, Role.ADMIN)
  remove(@Param('id') id: string, @User() user: User) {
    return this.studentProfileService.remove(id, user);
  }
}
