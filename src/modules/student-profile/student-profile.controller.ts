import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { StudentProfileService } from './student-profile.service';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { User } from '@sc-decorators/user';
import { ProfileImageService } from '@sc-modules/profile-image/profile-image.service';
import { FileUpload } from '@sc-decorators/file-upload';

@Controller('student-profile')
@ApiTags('Student Profile')
@Auth(...Object.values(Role))
export class StudentProfileController {
  constructor(
    private readonly profileImageService: ProfileImageService,
    private readonly studentProfileService: StudentProfileService,
  ) {}

  @Post()
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  create(
    @Body() createStudentProfileDto: CreateStudentProfileDto,
    @User() user: User,
  ) {
    return this.studentProfileService.create(createStudentProfileDto, {
      schoolId: user.schoolId,
      academicYear: user.school.currentAcademicYear,
    });
  }

  @Get()
  findAll(@User() user: User) {
    return this.studentProfileService.findAll({ schoolId: user.schoolId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentProfileService.findById(id);
  }

  @Put(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.STUDENT)
  @FileUpload(UpdateStudentProfileDto, 'profileImage')
  async update(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateStudentProfile: UpdateStudentProfileDto,
    @User() user: User,
  ) {
    const profilePicture = await this.profileImageService.updateProfileImage(
      id,
      Role.STUDENT,
      file,
    );
    updateStudentProfile.profileImage = profilePicture._id;
    return this.studentProfileService.update(id, updateStudentProfile, user);
  }

  @Delete(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id') id: string, @User() user: User) {
    return this.studentProfileService.remove(id, user);
  }
}
