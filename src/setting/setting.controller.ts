import { Controller, Get, Post,
  UseGuards, Req, Res, Request } from '@nestjs/common'
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto/update-setting.dto'
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthGuard } from '../auth/auth.guard';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @UseGuards(AuthGuard)
  @Get('updateCriteria')
  async updateCriteria(@Request() request)
  {
    const id = request.user.sub
    const criteria = await this.settingService.updateCriteria(id)
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async update(@Request() request, @Res() res) {
    const setting = request.body
    const id = request.user.sub

    await this.settingService.update(id, setting)
    .then(data => {
      return res.status(200).json({
        status: 200,
        ok: true,
        data,
      });
    })
    .catch(error => {
      // Handle error
      return res.status(200).json({
        status: 500,
        ok: false,
        message: error,
      });
    });
  }

}
