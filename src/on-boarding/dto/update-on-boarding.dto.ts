import { PartialType } from '@nestjs/mapped-types';
import { CreateOnBoardingDto } from './create-on-boarding.dto';

export class UpdateOnBoardingDto extends PartialType(CreateOnBoardingDto) {}
