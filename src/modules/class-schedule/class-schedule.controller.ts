import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassScheduleService } from './class-schedule.service';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@sc-decorators/user';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';

@Controller('class-schedule')
@Auth(...Object.values(Role))
@ApiTags('Class Schedule')
export class ClassScheduleController {
  constructor(private readonly classScheduleService: ClassScheduleService) {}

  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  @Post()
  create(
    @Body() createClassScheduleDto: CreateClassScheduleDto,
    @User('schoolId') schoolId: string,
  ) {
    return this.classScheduleService.create(createClassScheduleDto, {
      schoolId,
    });
  }

  @Get()
  findAll(@User('schoolId') schoolId: string) {
    return this.classScheduleService.findAll({ schoolId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classScheduleService.findById(id);
  }

  @Put(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateClassScheduleDto: UpdateClassScheduleDto,
  ) {
    return this.classScheduleService.update(id, updateClassScheduleDto);
  }

  @Delete(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.classScheduleService.remove(id);
  }
}
