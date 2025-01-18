import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';

@Controller('users')
@ApiTags('Users')
@Auth('all')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(Role.SUPER_ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createDocument(createUserDto);
  }

  @Get()
  @Auth(Role.SUPER_ADMIN)
  findAll() {
    return this.usersService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateDocument(id, updateUserDto);
  }

  @Delete(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.softDelete(id);
  }
}
