import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';

@Controller('admin')
@Auth(Role.ADMIN, Role.SUPER_ADMIN)
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Auth(Role.SUPER_ADMIN)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createDocument(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateDocument(id, updateAdminDto);
  }

  @Delete(':id')
  @Auth(Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.adminService.softDelete({ id });
  }
}
