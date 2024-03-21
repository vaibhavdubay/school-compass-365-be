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
import { User } from '@sc-decorators/user';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';

@Controller('class-subject')
@ApiTags('Class Subject')
@Auth(...Object.values(Role))
export class ClassSubjectController {
  constructor(private readonly classSubjectService: ClassSubjectService) {}

  @Post()
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  create(
    @Body() createClassSubjectDto: CreateClassSubjectDto,
    @User() user: User,
  ) {
    return this.classSubjectService.create(createClassSubjectDto, {
      schoolId: user.schoolId,
    });
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
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateClassSubjectDto: UpdateClassSubjectDto,
  ) {
    return this.classSubjectService.update(id, updateClassSubjectDto);
  }

  @Delete(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.classSubjectService.remove(id);
  }
}
