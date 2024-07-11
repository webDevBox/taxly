import { Module } from '@nestjs/common';
import { ChartOfAccountService } from './chart-of-account.service';
import { ChartOfAccountController } from './chart-of-account.controller';
import { ChartOfAccount } from '../chart-of-account/entities/chart-of-account.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ChartOfAccount])],
  controllers: [ChartOfAccountController],
  providers: [ChartOfAccountService]
})
export class ChartOfAccountModule {}
