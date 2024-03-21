import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassSubjectService } from './class-subject.service';
import { CreateClassSubjectDto } from './dto/create-class-subject.dto';
import { UpdateClassSubjectDto } from './dto/update-class-subject.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('class-subject')
@ApiTags('Class Subject')
export class ClassSubjectController {
  constructor(private readonly classSubjectService: ClassSubjectService) {}

  @Post()
  create(@Body() createClassSubjectDto: CreateClassSubjectDto) {
    return this.classSubjectService.create(createClassSubjectDto);
  }

  @Get()
  findAll() {
    return this.classSubjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classSubjectService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassSubjectDto: UpdateClassSubjectDto,
  ) {
    return this.classSubjectService.update(id, updateClassSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classSubjectService.remove(id);
  }
}
