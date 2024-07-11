import { Test, TestingModule } from '@nestjs/testing';
import { OnBoardingController } from './on-boarding.controller';
import { OnBoardingService } from './on-boarding.service';

describe('OnBoardingController', () => {
  let controller: OnBoardingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnBoardingController],
      providers: [OnBoardingService],
    }).compile();

    controller = module.get<OnBoardingController>(OnBoardingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
