import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { FileUpload } from '@sc-decorators/file-upload';
import { ImageService } from '@sc-modules/image/image.service';

@Controller('admin')
@Auth(Role.ADMIN, Role.SUPER_ADMIN)
@ApiTags('Admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly imageService: ImageService,
  ) {}

  @Get()
  findAll() {
    return this.adminService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findById(id);
  }

  @Patch(':id')
  @FileUpload(UpdateAdminDto, 'image')
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    if (file) {
      const user = await this.adminService.updateDocument(id, updateAdminDto);
      this.imageService.updateProfileImage(user, file);
      this.adminService.save(user).then();
      return user;
    } else {
      return this.adminService.updateDocument(id, updateAdminDto);
    }
  }

  @Delete(':id')
  @Auth(Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.adminService.softDelete({ id });
  }
}
