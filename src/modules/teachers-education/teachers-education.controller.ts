import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeachersEducationService } from './teachers-education.service';
import { CreateTeachersEducationDto } from './dto/create-teachers-education.dto';
import { UpdateTeachersEducationDto } from './dto/update-teachers-education.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';

@Controller('teachers-education')
@ApiTags('Teachers Education')
@Auth(Role.ADMIN, Role.SUPER_ADMIN, Role.TEACHER)
export class TeachersEducationController {
  constructor(
    private readonly teachersEducationService: TeachersEducationService,
  ) {}

  @Post()
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  create(@Body() createTeachersEducationDto: CreateTeachersEducationDto) {
    return this.teachersEducationService.createDocument(
      createTeachersEducationDto,
    );
  }

  @Get()
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.teachersEducationService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersEducationService.findById(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateTeachersEducationDto: UpdateTeachersEducationDto,
  ) {
    return this.teachersEducationService.updateDocument(
      id,
      updateTeachersEducationDto,
    );
  }

  @Delete(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.teachersEducationService.softDelete(id);
  }
}
