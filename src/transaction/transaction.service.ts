import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Transaction } from './entities/transaction.entity'
import { ChartOfAccount } from '../chart-of-account/entities/chart-of-account.entity'
import { Criterion } from '../criteria/entities/criterion.entity'
import { User } from '../user/entities/user.entity'

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ChartOfAccount)
    private readonly chartOfAccountRepository: Repository<ChartOfAccount>,
    @InjectRepository(Criterion)
    private readonly criteriaRepository: Repository<Criterion>,
  ) { }

  findByCat(code) {
    return this.chartOfAccountRepository.findOne({ where: { code } })
  }
  
  findByTransaction(transaction_id) {
    return this.transactionRepository.findOne({ where: { transaction_id } });
  }

  async updateTransaction(id,request)
  {
    const transaction = await this.transactionRepository.findOne({ where: { transaction_id: request.transactionId } })
    transaction.deduction = request.action
    await this.transactionRepository.save(transaction)

    const updatedTransactions = await this.transactionRepository.find({
      where: {
        userId: id,
        flag_deduction: 1,
        deduction: 0
      }
    })
    return {
      ok: true,
      transactions: updatedTransactions
    }
  }

  async createTransactions(userId, transactions) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    const setting = user.setting

    const deductions = JSON.parse(setting.criteria)

    var flag_coa = 0
    var flag_deduction = 0
    for (const transaction of transactions) {
      var category = transaction.subClass ? transaction.subClass.title : 'unKnown'
      var code = transaction.subClass ? transaction.subClass.code : 0
      const checkChart = await this.findByCat(code)
      if (checkChart) {
        flag_coa = 1
      } else {
        flag_coa = 0
      }

      flag_deduction = 0;

      for (const deduction of deductions) {
        if (code == deduction) {
          flag_deduction = 1
          break
        }
      }

      const criterias = await this.criteriaRepository.find()
      var deductionCriteria = ''
      for(const criteria of criterias)
      {
        const array = JSON.parse(criteria.values)
        for(const index of array)
        {
          if(code == index)
          {
            deductionCriteria = criteria.name
          }

        }
      }

      const transactionCheck = await this.findByTransaction(transaction.id)
      if (!transactionCheck) {
        const newTransaction = new Transaction()
        newTransaction.category = category
        newTransaction.category_id = code
        newTransaction.amount = transaction.amount
        newTransaction.class = transaction.class
        newTransaction.account = transaction.account
        newTransaction.direction = transaction.direction
        newTransaction.description = transaction.description
        newTransaction.postDate = transaction.postDate
        newTransaction.flag_coa = flag_coa
        newTransaction.flag_deduction = flag_deduction
        newTransaction.userId = userId
        newTransaction.criteria = deductionCriteria
        newTransaction.transaction_id = transaction.id
        await this.transactionRepository.save(newTransaction)
      }
    }
    return await this.transactionRepository.find({
      where: {
        userId: userId,
        flag_deduction: 1,
        deduction: 0
      }
    })
  }

  async userTransactions(id)
  {
    const approved = await this.transactionRepository.find({
      where: {
        userId: id,
        deduction: 1
      }
    })
    
    const declined = await this.transactionRepository.find({
      where: {
        userId: id,
        deduction: 2
      }
    })
    
    const possible = await this.transactionRepository.find({
      where: {
        userId: id,
        flag_deduction: 1
      }
    })
    
    const later = await this.transactionRepository.find({
      where: {
        userId: id,
        deduction: 0,
        flag_deduction: 1
      }
    })

    return {
      ok: true,
      approved :approved,
      declined :declined,
      possible :possible,
      later :later
    }

  }

  async getResources(id)
  {
    const categories = await this.chartOfAccountRepository.find()
    return {
      ok: true,
      cats: categories,

    }
  }
  
  async getTransaction(id,request)
  {
    const transaction = await this.transactionRepository.findOne({where:{
      id: request.id
    }})
    return {
      ok: true,
      transaction: transaction,

    }
  }

  async addTransaction(id,request)
  {
    const category = await this.chartOfAccountRepository.findOne({where:{
      category: request.category
    }})
    const code = category.code

    const user = await this.userRepository.findOne({ where: { id: id } })
    const setting = user.setting

    const deductions = JSON.parse(setting.criteria)

    var flag_deduction = 0;

      for (const deduction of deductions) {
        if (code == deduction) {
          flag_deduction = 1
          break
        }
      }

      const criterias = await this.criteriaRepository.find()
      var deductionCriteria = ''
      for(const criteria of criterias)
      {
        const array = JSON.parse(criteria.values)
        for(const index of array)
        {
          if(code == index)
          {
            deductionCriteria = criteria.name
          }

        }
      }


      const transaction = new Transaction()
      transaction.amount = request.amount
      transaction.userId = id
      transaction.category = request.category
      transaction.account = request.account
      transaction.description = request.description
      transaction.postDate = request.date
      transaction.category_id = code
      transaction.flag_coa = 1
      transaction.flag_deduction = flag_deduction
      transaction.deduction = request.deduction
      transaction.criteria = deductionCriteria
      const saver = await this.transactionRepository.save(transaction)
      return {
        ok: true,
        transaction : saver
      }
  }

  async editTransaction(id,request)
  {
    const transaction = await this.transactionRepository.findOne({where:{
      id: request.id
    }})

      transaction.description = request.description
      transaction.category = request.category
      transaction.account = request.account
      transaction.deduction = request.deduction
      // transaction.postDate = request.date

      const saver = await this.transactionRepository.save(transaction)
      return{
        ok: true,
        transaction: saver
      }

  }

}
