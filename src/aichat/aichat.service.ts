import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Aichat } from './entities/aichat.entity'

@Injectable()
export class AichatService {
  
  constructor(
    @InjectRepository(Aichat)
    private readonly aiChatRepository: Repository<Aichat>,
  ) {}

  async getUserChats(user_id,request)
  {
    const chats = await this.aiChatRepository.find({ where: { 
      user_id,
      transactionId: request.transactionId
    } })
    return chats
  }

  async createChat(user,message,type,transactionId)
  {
    const chat = new Aichat()

    chat.user_id = user
    chat.type = type
    chat.message = message
    chat.transactionId = transactionId
    return this.aiChatRepository.save(chat)
  }

}