import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentAttendanceService } from './student-attendance.service';
import { CreateStudentAttendanceDto } from './dto/create-student-attendance.dto';
import { UpdateStudentAttendanceDto } from './dto/update-student-attendance.dto';
import { Auth } from '@sc-decorators/auth';
import { UserProfile } from '@sc-decorators/user-profile';
import { School } from '@sc-modules/school/entities/school.entity';
import { ApiTags } from '@nestjs/swagger';
import { QueryStudentAttendance } from './dto/query-student-attendance.dto';

@Controller('student-attendance')
@ApiTags('Student Attendance')
@Auth('all')
export class StudentAttendanceController {
  constructor(
    private readonly studentAttendanceService: StudentAttendanceService,
  ) {}

  @Post()
  create(
    @Body() createStudentAttendanceDto: CreateStudentAttendanceDto,
    @UserProfile('school') school: School,
  ) {
    createStudentAttendanceDto['schoolId'] = school.id;
    createStudentAttendanceDto['academicYear'] = school.currentAcademicYear;
    return this.studentAttendanceService.createDocument(
      createStudentAttendanceDto,
    );
  }

  @Get()
  findAll(
    @UserProfile() user: UserProfile,
    @Query() filter: QueryStudentAttendance,
  ) {
    filter['school'] = { id: user.school.id };
    return this.studentAttendanceService.findAttendance(user, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentAttendanceService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentAttendanceDto: UpdateStudentAttendanceDto,
  ) {
    return this.studentAttendanceService.updateDocument(
      id,
      updateStudentAttendanceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentAttendanceService.softDelete({ id });
  }
}
