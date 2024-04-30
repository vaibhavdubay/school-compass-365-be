import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { UserProfile } from '@sc-decorators/user-profile';

@Controller('student')
@Auth('all')
@ApiTags('Students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Auth(Role.ADMIN, Role.SUPER_ADMIN, Role.TEACHER)
  create(
    @Body() createStudentDto: CreateStudentDto,
    @UserProfile() userProfile: UserProfile,
  ) {
    createStudentDto['school'] = userProfile.school;
    createStudentDto['academicYears'] = [
      userProfile.school.currentAcademicYear,
    ];
    return this.studentService.createDocument(createStudentDto);
  }

  @Get()
  findAll(@UserProfile() userProfile: UserProfile) {
    return this.studentService.find({ where: { school: userProfile.school } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.updateDocument(id, updateStudentDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN, Role.TEACHER)
  remove(@Param('id') id: string) {
    return this.studentService.softDelete({ id });
  }
}
