import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OccupationService } from './occupation.service';
import { CreateOccupationDto } from './dto/create-occupation.dto';
import { UpdateOccupationDto } from './dto/update-occupation.dto';

@Controller('occupation')
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) {}

  @Post()
  create(@Body() createOccupationDto: CreateOccupationDto) {
    return this.occupationService.create(createOccupationDto);
  }

  @Get()
  findAll() {
    return this.occupationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.occupationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOccupationDto: UpdateOccupationDto) {
    return this.occupationService.update(+id, updateOccupationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.occupationService.remove(+id);
  }
}
