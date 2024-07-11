import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './entities/transaction.entity'
import { ChartOfAccount } from '../chart-of-account/entities/chart-of-account.entity'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Criterion } from '../criteria/entities/criterion.entity'
import { User } from '../user/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Transaction, ChartOfAccount, Criterion])],
  controllers: [TransactionController],
  providers: [TransactionService, JwtService]
})
export class TransactionModule {}
