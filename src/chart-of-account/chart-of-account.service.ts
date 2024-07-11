import { Injectable } from '@nestjs/common';
import { CreateChartOfAccountDto } from './dto/create-chart-of-account.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart-of-account.dto';
import { ChartOfAccount } from './entities/chart-of-account.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ChartOfAccountService {
  constructor(
    @InjectRepository(ChartOfAccount)
    private readonly chatOfAccountRepository: Repository<ChartOfAccount>,
  ) {}

  async createRootCategory(data){
    const chart = new ChartOfAccount();
    chart.category = data.category
    chart.code = data.code
    return this.chatOfAccountRepository.save(chart)
  }

  async createSubCategory(parent_id, data) {

    // const parent = this.chatOfAccountRepository.findOne({where:{parent_id}})

    const chart = new ChartOfAccount();
    chart.category = data.category
    chart.code = data.code
    chart.parent_id = parent_id
    return this.chatOfAccountRepository.save(chart)

  //   const subCategory = this.chatOfAccountRepository.create({
  //     ...data,
  //     parent,
  //   });
  //   return this.chatOfAccountRepository.save(subCategory);
  }

  create(createChartOfAccountDto: CreateChartOfAccountDto) {
    return 'This action adds a new chartOfAccount';
  }

  findAll() {
    return `This action returns all chartOfAccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chartOfAccount`;
  }

  update(id: number, updateChartOfAccountDto: UpdateChartOfAccountDto) {
    return `This action updates a #${id} chartOfAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} chartOfAccount`;
  }
}
