import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VerificationService } from './verification.service'
import { VerificationController } from './verification.controller'
import { Verification } from '../verification/entities/verification.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Verification])],
  controllers: [VerificationController],
  providers: [VerificationService]
})
export class VerificationModule {}
