import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@sc-enums/role';
import { Auth } from '@sc-decorators/auth';
import { User } from '@sc-decorators/user';

@ApiTags('Admin')
@Controller('admin')
@Auth(Role.ADMIN, Role.SUPER_ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Auth(Role.SUPER_ADMIN)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @Auth(Role.SUPER_ADMIN)
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findById(id);
  }

  @Auth()
  @Get('login/:id')
  findOneForLogin(@Param('id') id: string) {
    return this.adminService.exists({ _id: id });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @User() user: User,
  ) {
    return this.adminService.update(id, updateAdminDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: User) {
    return this.adminService.remove(id, user);
  }
}
