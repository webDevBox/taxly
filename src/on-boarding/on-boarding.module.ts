import { Module } from '@nestjs/common';
import { OnBoardingService } from './on-boarding.service';
import { OnBoardingController } from './on-boarding.controller';

@Module({
  controllers: [OnBoardingController],
  providers: [OnBoardingService]
})
export class OnBoardingModule {}
