import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OnBoardingService } from './on-boarding.service';
import { CreateOnBoardingDto } from './dto/create-on-boarding.dto';
import { UpdateOnBoardingDto } from './dto/update-on-boarding.dto';

@Controller('on-boarding')
export class OnBoardingController {
  constructor(private readonly onBoardingService: OnBoardingService) {}

  @Post()
  create(@Body() createOnBoardingDto: CreateOnBoardingDto) {
    return this.onBoardingService.create(createOnBoardingDto);
  }

  @Get()
  findAll() {
    return this.onBoardingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onBoardingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnBoardingDto: UpdateOnBoardingDto) {
    return this.onBoardingService.update(+id, updateOnBoardingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onBoardingService.remove(+id);
  }
}
