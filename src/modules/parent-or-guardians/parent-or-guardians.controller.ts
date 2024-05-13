import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ParentOrGuardiansService } from './parent-or-guardians.service';
import { CreateParentOrGuardianDto } from './dto/create-parent-or-guardian.dto';
import { UpdateParentOrGuardianDto } from './dto/update-parent-or-guardian.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';

@Controller('parent-or-guardians')
@ApiTags('Parent & Guardians')
@Auth('all')
export class ParentOrGuardiansController {
  constructor(
    private readonly parentOrGuardiansService: ParentOrGuardiansService,
  ) {}

  @Post()
  create(@Body() createParentOrGuardianDto: CreateParentOrGuardianDto) {
    return this.parentOrGuardiansService.createDocument(
      createParentOrGuardianDto,
    );
  }

  @Get()
  findAll() {
    return this.parentOrGuardiansService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parentOrGuardiansService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateParentOrGuardianDto: UpdateParentOrGuardianDto,
  ) {
    return this.parentOrGuardiansService.updateDocument(
      id,
      updateParentOrGuardianDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentOrGuardiansService.softRemove({ id });
  }
}
