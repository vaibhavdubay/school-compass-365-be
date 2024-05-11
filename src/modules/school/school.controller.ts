import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  Patch,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileUpload } from '@sc-decorators/file-upload';
import { UserProfile } from '@sc-decorators/user-profile';
import { ImageService } from '@sc-modules/image/image.service';
import { Auth } from '@sc-decorators/auth';
import { School } from './entities/school.entity';
import { Role } from '@sc-enums/role';

@Controller('school')
@ApiTags('School')
@Auth('all')
export class SchoolController {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.createSchoolProfile(createSchoolDto);
  }

  @Get()
  findAll(@UserProfile() user: UserProfile) {
    const filter =
      user.user.role == Role.SUPER_ADMIN ? {} : { id: user.school.id };
    return this.schoolService.find({
      where: filter,
    });
  }

  @Get('completeAcademicYear')
  completeAcademicYear(@UserProfile('school') school: School) {
    this.schoolService.completeAcademicYear(school.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolService.findById(id);
  }

  @Patch(':id')
  @FileUpload(UpdateSchoolDto, 'image')
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
    @UserProfile() completeProfile: UserProfile,
  ) {
    if (typeof updateSchoolDto.classes == 'string')
      updateSchoolDto['classes'] = JSON.parse(updateSchoolDto.classes);
    if (file) {
      const fileName = `/logo/${id}.webp`;
      const profileImage = await this.imageService.saveImage(
        completeProfile,
        fileName,
        file,
      );
      updateSchoolDto['logo'] = profileImage;
      updateSchoolDto['logoUrl'] = fileName;
    }
    return this.schoolService.updateDocument(id, updateSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolService.softRemove({ id });
  }
}
