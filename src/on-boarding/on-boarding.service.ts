import { Injectable } from '@nestjs/common';
import { CreateOnBoardingDto } from './dto/create-on-boarding.dto';
import { UpdateOnBoardingDto } from './dto/update-on-boarding.dto';

@Injectable()
export class OnBoardingService {
  create(createOnBoardingDto: CreateOnBoardingDto) {
    return 'This action adds a new onBoarding';
  }

  findAll() {
    return `This action returns all onBoarding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} onBoarding`;
  }

  update(id: number, updateOnBoardingDto: UpdateOnBoardingDto) {
    return `This action updates a #${id} onBoarding`;
  }

  remove(id: number) {
    return `This action removes a #${id} onBoarding`;
  }
}
