import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassScheduleService } from './class-schedule.service';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('class-schedule')
@ApiTags('Class Schedule')
export class ClassScheduleController {
  constructor(private readonly classScheduleService: ClassScheduleService) {}

  @Post()
  create(@Body() createClassScheduleDto: CreateClassScheduleDto) {
    return this.classScheduleService.create(createClassScheduleDto);
  }

  @Get()
  findAll() {
    return this.classScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classScheduleService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassScheduleDto: UpdateClassScheduleDto,
  ) {
    return this.classScheduleService.update(id, updateClassScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classScheduleService.remove(id);
  }
}
