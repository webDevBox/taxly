import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ChartOfAccountService } from './chart-of-account.service';
import { CreateChartOfAccountDto } from './dto/create-chart-of-account.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart-of-account.dto';

@Controller('chart-of-account')
export class ChartOfAccountController {
  constructor(private readonly chartOfAccountService: ChartOfAccountService) {}

  @Post('createBulk')
  async createBulk(@Body() data: any)
  {
    data.map(async (record) => {
        const rootCategoryData = record.rootCategory;
        const subCategoriesData = record.subCategories;

        const rootCategory = await this.chartOfAccountService.createRootCategory(rootCategoryData);
        await this.createSubCategories(rootCategory.id, subCategoriesData);
    })
  }

  async createSubCategories(parentId: number, subCategories: any[]) {
    for (const subCategoryData of subCategories) {
      const subCategory = await this.chartOfAccountService.createSubCategory(parentId, subCategoryData);

      if (subCategoryData.children && subCategoryData.children.length > 0) {
        await this.createSubCategories(subCategory.id, subCategoryData.children)
      }
    }
  }

  @Post()
  create(@Body() createChartOfAccountDto: CreateChartOfAccountDto) {
    return this.chartOfAccountService.create(createChartOfAccountDto);
  }

  @Get()
  findAll() {
    return this.chartOfAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chartOfAccountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChartOfAccountDto: UpdateChartOfAccountDto) {
    return this.chartOfAccountService.update(+id, updateChartOfAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartOfAccountService.remove(+id);
  }
}
