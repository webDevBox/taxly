import { Controller, Get, Post, Body, Patch,
  UseGuards, Param, Delete, Request } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard)
  @Post('createTransactions')
  async createTransactions(@Request() request) {
    const userId = request.user.sub
    return await this.transactionService.createTransactions(userId,request.body)
  }
  
  @UseGuards(AuthGuard)
  @Post('updateTransaction')
  async updateTransaction(@Request() request) {
    const userId = request.user.sub
    return await this.transactionService.updateTransaction(userId,request.body)
  }

  @UseGuards(AuthGuard)
  @Get('getResources')
  async getResources(@Request() request) {
    const userId = request.user.sub
    return await this.transactionService.getResources(userId)
  }

  @UseGuards(AuthGuard)
  @Get('userTransactions')
  async userTransactions(@Request() request) {
    const userId = request.user.sub
    return await this.transactionService.userTransactions(userId)
  }
  
  @UseGuards(AuthGuard)
  @Post('getTransaction')
  async getTransaction(@Request() request) {
    const userId = request.user.sub
    return await this.transactionService.getTransaction(userId,request.body)
  }
  
  @UseGuards(AuthGuard)
  @Post('addTransaction')
  async addTransaction(@Request() request) {
    const userId = request.user.sub
    return await this.transactionService.addTransaction(userId,request.body)
  }
  
  @UseGuards(AuthGuard)
  @Post('editTransaction')
  async editTransaction(@Request() request) {
    const userId = request.user.sub
    return await this.transactionService.editTransaction(userId,request.body)
  }



}
