import { Module } from '@nestjs/common';
import { AichatService } from './aichat.service';
import { AichatController } from './aichat.controller';
import { Aichat } from './entities/aichat.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([Aichat])],
  controllers: [AichatController],
  providers: [AichatService, JwtService]
})
export class AichatModule {}
