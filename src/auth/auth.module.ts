import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ApiService } from '../api/api.service'
import { UserService } from '../user/user.service'
import { ConfigService } from '@nestjs/config'
import { GlobalVariableContainer } from '../../global-variables'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Verification } from '../verification/entities/verification.entity'
import { VerificationService } from '../verification/verification.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Setting } from '../setting/entities/setting.entity'
import { AichatService } from '../aichat/aichat.service'
import { Aichat } from '../aichat/entities/aichat.entity'
import { Criterion } from '../criteria/entities/criterion.entity'
import { Occupation } from '../occupation/entities/occupation.entity'
import { UserType } from '../user-type/entities/user-type.entity'
import { Profession } from '../profession/entities/profession.entity'
import { OnBoarding } from '../on-boarding/entities/on-boarding.entity'
import { OnBoardingQuestion } from '../on-boarding/entities/on-boarding-question.entity'
import { Transaction } from '../transaction/entities/transaction.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([OnBoardingQuestion, User,Setting,Aichat,Criterion,Occupation]),
    TypeOrmModule.forFeature([Transaction,OnBoarding, Profession,UserType,Verification]),
    PassportModule,
    JwtModule
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '1h' },
    // }),
  ],
  controllers: [AuthController],
  providers: [VerificationService, UserService, AuthService,
     ApiService, ConfigService, GlobalVariableContainer, JwtService, AichatService],
    exports: [JwtModule],
})
export class AuthModule {}
