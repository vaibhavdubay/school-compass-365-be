import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { UserProfile } from '@sc-decorators/user-profile';
import { FileUpload } from '@sc-decorators/file-upload';
import { QueryStudent } from './dto/query-student.dto';

@Controller('student')
@Auth('all')
@ApiTags('Students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Auth(Role.ADMIN, Role.SUPER_ADMIN, Role.TEACHER)
  @FileUpload(CreateStudentDto, 'image')
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createStudentDto: CreateStudentDto,
    @UserProfile() userProfile: UserProfile,
  ) {
    return this.studentService.createStudentProfile(
      createStudentDto,
      userProfile,
      file,
    );
  }

  @Get()
  findAll(
    @UserProfile() userProfile: UserProfile,
    @Query() query: QueryStudent,
  ) {
    const id = userProfile.school.id;
    const filter = id ? { school: { id } } : {};
    filter['class'] = { id: query.classId };
    delete query.classId;
    Object.assign(filter, query);
    return this.studentService.find({ where: filter });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findById(id);
  }

  @Patch(':id')
  @FileUpload(UpdateStudentDto, 'image')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.studentService.updateStudentProfile(id, updateStudentDto, file);
  }

  @Delete(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN, Role.TEACHER)
  remove(@Param('id') id: string) {
    return this.studentService.softDelete({ id });
  }
}
