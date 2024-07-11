import { Controller, Get, Post, Body, Patch, Param,
  UseGuards, Res, Request,  Delete } from '@nestjs/common';
import { SupportTicketService } from './support-ticket.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('support-ticket')
export class SupportTicketController {
  constructor(private readonly supportTicketService: SupportTicketService) {}

  @UseGuards(AuthGuard)
  @Post('getUserTickets')
  async getUserTickets(@Request() request, @Res() res)
  {
    const id = request.user.sub

    await this.supportTicketService.getUserTickets(id,request.body)
    .then(data => {
      return res.status(200).json({
        status: 200,
        ok: true,
        data,
      });
    })
  }

  @UseGuards(AuthGuard)
  @Post('createTickets')
  async createTickets(@Request() request) {
    const id = request.user.sub
    
    return await this.supportTicketService.createTickets(id,request.body)
  }
  
}
