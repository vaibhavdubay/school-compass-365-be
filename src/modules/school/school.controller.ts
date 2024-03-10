import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { User } from '@sc-decorators/user';
import { SchoolProfile } from './entities/school.entity';

@Controller('school')
@ApiTags('School Profile')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @Auth(Role.SUPERADMIN)
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  @Auth(...Object.values(Role))
  async findAll(@User() user: User): Promise<SchoolProfile[]> {
    if (user.role === Role.SUPERADMIN) return this.schoolService.findAll();
    return [await this.schoolService.findById(user.schoolId)];
  }

  @Get(':id')
  @Auth(...Object.values(Role))
  findOne(@Param('id') id: string) {
    return this.schoolService.findById(id);
  }

  @Put(':id')
  @Auth(Role.ADMIN, Role.SUPERADMIN)
  update(
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
    @User() user: User,
  ) {
    return this.schoolService.update(id, updateSchoolDto, user);
  }

  @Delete(':id')
  @Auth(Role.SUPERADMIN, Role.ADMIN)
  remove(@Param('id') id: string, @User() user: User) {
    return this.schoolService.remove(id, user);
  }
}
