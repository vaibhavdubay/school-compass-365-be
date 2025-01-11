import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeachersExperienceService } from './teachers-experience.service';
import { CreateTeachersExperienceDto } from './dto/create-teachers-experience.dto';
import { UpdateTeachersExperienceDto } from './dto/update-teachers-experience.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';

@Controller('teachers-experience')
@ApiTags('Teachers Experience')
@Auth(Role.ADMIN, Role.SUPER_ADMIN, Role.TEACHER)
export class TeachersExperienceController {
  constructor(
    private readonly teachersExperienceService: TeachersExperienceService,
  ) {}

  @Post()
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  create(@Body() createTeachersExperienceDto: CreateTeachersExperienceDto) {
    return this.teachersExperienceService.createDocument(
      createTeachersExperienceDto,
    );
  }

  @Get()
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.teachersExperienceService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersExperienceService.findById(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateTeachersExperienceDto: UpdateTeachersExperienceDto,
  ) {
    return this.teachersExperienceService.updateDocument(
      id,
      updateTeachersExperienceDto,
    );
  }

  @Delete(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.teachersExperienceService.softDelete(id);
  }
}
