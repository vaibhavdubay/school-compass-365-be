import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Sse,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { User } from '@sc-decorators/user';
import { SchoolProfile } from './entities/school.entity';
import { CompleteSchoolObject } from './dto/complete-school.dto';
import { Observable } from 'rxjs';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('school')
@ApiTags('School Profile')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @Auth(Role.SUPER_ADMIN)
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  @Auth(...Object.values(Role))
  async findAll(@User() user: User): Promise<SchoolProfile[]> {
    if (user.role === Role.SUPER_ADMIN) return this.schoolService.findAll();
    return [await this.schoolService.findById(user.schoolId)];
  }

  @Get('complete')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  async getCompleteSchoolProfile(
    @User() user: User,
  ): Promise<CompleteSchoolObject> {
    return (await this.schoolService.getCompleteSchoolDetails(user))[0];
  }

  @Sse('complete-academic-year')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  sse(@User() user: User): Observable<MessageEvent> {
    return this.schoolService.completeAcademicYear$(user.school);
  }

  @Get(':id')
  @Auth(...Object.values(Role))
  findOne(@Param('id') id: string) {
    return this.schoolService.findById(id);
  }

  @Put(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
    @User() user: User,
  ) {
    return this.schoolService.update(id, updateSchoolDto, user);
  }

  @Delete(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id') id: string, @User() user: User) {
    return this.schoolService.remove(id, user);
  }
}
