import { Module } from '@nestjs/common';
import { SupportTicketService } from './support-ticket.service'
import { SupportTicketController } from './support-ticket.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportTicket } from './entities/support-ticket.entity'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([SupportTicket])],
  controllers: [SupportTicketController],
  providers: [SupportTicketService, JwtService]
})
export class SupportTicketModule {}
