import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentAttendanceService } from './student-attendance.service';
import { CreateStudentAttendanceDto } from './dto/create-student-attendance.dto';
import { UpdateStudentAttendanceDto } from './dto/update-student-attendance.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { User } from '@sc-decorators/user';

@Controller('student-attendance')
@ApiTags('Student Attendance')
@Auth(Role.ALL)
export class StudentAttendanceController {
  constructor(
    private readonly studentAttendanceService: StudentAttendanceService,
  ) {}

  @Post()
  @Auth(Role.ADMIN, Role.TEACHER)
  create(
    @Body() createStudentAttendanceDto: CreateStudentAttendanceDto,
    @User() user: User,
  ) {
    return this.studentAttendanceService.create(createStudentAttendanceDto, {
      schoolId: user.schoolId,
      academicYear: user.school.currentAcademicYear,
    });
  }
  @Post('/addAttendance')
  @Auth(Role.ADMIN, Role.TEACHER)
  @ApiBody({
    type: [CreateStudentAttendanceDto],
  })
  createAll(
    @Body() createStudentAttendanceDto: CreateStudentAttendanceDto[],
    @User() user: User,
  ) {
    return this.studentAttendanceService.createMany(
      createStudentAttendanceDto,
      {
        schoolId: user.schoolId,
        academicYear: user.school.currentAcademicYear,
      },
    );
  }

  @Get()
  @ApiQuery({
    name: 'filter',
    required: false,
    description:
      'accepts a JSON string that can help to iterate filtration of the documents',
    type: 'string',
  })
  findAll(@Query('filter') filter: string, @User() user: User) {
    return this.studentAttendanceService.findAll({
      filter: filter,
      schoolId: user.schoolId,
    });
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.studentAttendanceService.findById(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateStudentAttendanceDto: UpdateStudentAttendanceDto,
  ) {
    return this.studentAttendanceService.update(id, updateStudentAttendanceDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.studentAttendanceService.remove(id);
  }
}
