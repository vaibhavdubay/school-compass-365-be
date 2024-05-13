import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AcademicYearService } from './academic-year.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';
import { Role } from '@sc-enums/role';

@Controller('academic-year')
@Auth(Role.SUPER_ADMIN)
@ApiTags('Academic Year')
export class AcademicYearController {
  constructor(private readonly academicYearService: AcademicYearService) {}

  @Post()
  create(@Body() createAcademicYearDto: CreateAcademicYearDto) {
    return this.academicYearService.createDocument(createAcademicYearDto);
  }

  @Get()
  findAll() {
    return this.academicYearService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicYearService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAcademicYearDto: UpdateAcademicYearDto,
  ) {
    return this.academicYearService.updateDocument(id, updateAcademicYearDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicYearService.softRemove({ id });
  }
}
