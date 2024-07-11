import { Injectable } from '@nestjs/common';
import { CreateOccupationDto } from './dto/create-occupation.dto';
import { UpdateOccupationDto } from './dto/update-occupation.dto';

@Injectable()
export class OccupationService {
  create(createOccupationDto: CreateOccupationDto) {
    return 'This action adds a new occupation';
  }

  findAll() {
    return `This action returns all occupation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} occupation`;
  }

  update(id: number, updateOccupationDto: UpdateOccupationDto) {
    return `This action updates a #${id} occupation`;
  }

  remove(id: number) {
    return `This action removes a #${id} occupation`;
  }
}
