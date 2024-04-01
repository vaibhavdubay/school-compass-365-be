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
import { TeacherProfileService } from './teacher-profile.service';
import { CreateTeacherProfileDto } from './dto/create-teacher-profile.dto';
import { UpdateTeacherProfileDto } from './dto/update-teacher-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { User } from '@sc-decorators/user';
import { ProfileImageService } from '@sc-modules/profile-image/profile-image.service';
import { FileUpload } from '@sc-decorators/file-upload';

@Controller('teacher-profile')
@ApiTags('Teacher Profile')
@Auth(...Object.values(Role))
export class TeacherProfileController {
  constructor(
    private readonly teacherProfileService: TeacherProfileService,
    private readonly profileImageService: ProfileImageService,
  ) {}

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
  @FileUpload(UpdateTeacherProfileDto, 'profileImage')
  async update(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateTeacherProfileDto: UpdateTeacherProfileDto,
    @User() user: User,
  ) {
    const profilePicture = await this.profileImageService.updateProfileImage(
      id,
      Role.STUDENT,
      file,
    );
    updateTeacherProfileDto.profileImage = profilePicture._id;
    return this.teacherProfileService.update(id, updateTeacherProfileDto, user);
  }

  @Delete(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id') id: string, @User() user: User) {
    return this.teacherProfileService.remove(id, user);
  }
}
