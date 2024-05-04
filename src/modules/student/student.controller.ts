import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { UserProfile } from '@sc-decorators/user-profile';
import { FileUpload } from '@sc-decorators/file-upload';
import { ImageService } from '@sc-modules/image/image.service';

@Controller('student')
@Auth('all')
@ApiTags('Students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @Auth(Role.ADMIN, Role.SUPER_ADMIN, Role.TEACHER)
  @FileUpload(CreateStudentDto, 'image')
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createStudentDto: CreateStudentDto,
    @UserProfile() userProfile: UserProfile,
  ) {
    createStudentDto['school'] = userProfile.school;
    createStudentDto['academicYears'] = [
      userProfile.school.currentAcademicYear,
    ];

    if (typeof createStudentDto.parentsGuardians == 'string')
      createStudentDto['parentsGuardians'] = JSON.parse(
        createStudentDto.parentsGuardians,
      );
    if (file) {
      const user = await this.studentService.createDocument(createStudentDto);
      this.imageService.updateProfileImage(user, file);
      this.studentService.save(user).then();
      return user;
    } else {
      return this.studentService.createDocument(createStudentDto);
    }
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
  @FileUpload(UpdateStudentDto, 'image')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (typeof updateStudentDto.parentsGuardians == 'string')
      updateStudentDto['parentsGuardians'] = JSON.parse(
        updateStudentDto.parentsGuardians,
      );
    if (file) {
      const user = await this.studentService.updateDocument(
        id,
        updateStudentDto,
      );
      this.imageService.updateProfileImage(user, file);
      this.studentService.save(user).then();
      return user;
    } else {
      return this.studentService.updateDocument(id, updateStudentDto);
    }
  }

  @Delete(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN, Role.TEACHER)
  remove(@Param('id') id: string) {
    return this.studentService.softDelete({ id });
  }
}
