import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SupportTicket } from './entities/support-ticket.entity'

@Injectable()
export class SupportTicketService {

  constructor(
    @InjectRepository(SupportTicket)
    private readonly supportTicketRepository: Repository<SupportTicket>,
  ) {}
  
  async getUserTickets(user_id,request)
  {
    const tickets = await this.supportTicketRepository.find({ where: { 
      user_id,
      transactionId: request.transactionId
    } })
    return tickets
  }

  async createTickets(user_id,request)
  {
    const ticket = new SupportTicket()
    ticket.user_id = user_id
    ticket.type = request.type
    ticket.message = request.query
    ticket.transactionId = request.transactionId
    await this.supportTicketRepository.save(ticket)
  
    return {
      ok: true,
      message: request.query
    }
  }

}
