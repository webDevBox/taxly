import { Controller, Get, Post, Body, Patch, Param,
  UseGuards, Req, Res, Request, Delete } from '@nestjs/common';
import { AichatService } from './aichat.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('aichat')
export class AichatController {
  constructor(private readonly aichatService: AichatService) {}

  @UseGuards(AuthGuard)
  @Post('allMessage')
  async getChats(@Request() request, @Res() res)
  {
    const id = request.user.sub

    await this.aichatService.getUserChats(id,request.body)
    .then(data => {
      return res.status(200).json({
        status: 200,
        ok: true,
        data,
      });
    })
  }
  
}
