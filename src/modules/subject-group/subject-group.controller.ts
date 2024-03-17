import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SubjectGroupService } from './subject-group.service';
import { CreateSubjectGroupDto } from './dto/create-subject-group.dto';
import { UpdateSubjectGroupDto } from './dto/update-subject-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';
import { User } from '@sc-decorators/user';

@Controller('subject-group')
@ApiTags('Subject Group')
@Auth(Role.SUPER_ADMIN, Role.ADMIN)
export class SubjectGroupController {
  constructor(private readonly subjectGroupService: SubjectGroupService) {}

  @Post()
  create(
    @Body() createSubjectGroupDto: CreateSubjectGroupDto,
    @User() user: User,
  ) {
    return this.subjectGroupService.create(createSubjectGroupDto, {
      schoolId: user.schoolId,
    });
  }

  @Get()
  findAll(@User() user: User) {
    return this.subjectGroupService.findAll({
      schoolId: user.schoolId,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectGroupService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubjectGroupDto: UpdateSubjectGroupDto,
  ) {
    return this.subjectGroupService.update(id, updateSubjectGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectGroupService.remove(id);
  }
}
