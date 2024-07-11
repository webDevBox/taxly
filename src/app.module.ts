import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ApiService } from './api/api.service';
import { AichatService } from './aichat/aichat.service'
import { Aichat } from './aichat/entities/aichat.entity'
import { GlobalVariableContainer } from '../global-variables'
import { VerificationModule } from './verification/verification.module';
import { SettingModule } from './setting/setting.module';
import {User} from './user/entities/user.entity'
import {Setting} from './setting/entities/setting.entity'
import {Transaction} from './transaction/entities/transaction.entity'
import { TransactionModule } from './transaction/transaction.module'
import { ChartOfAccount } from './chart-of-account/entities/chart-of-account.entity'
import { ChartOfAccountModule } from './chart-of-account/chart-of-account.module'
import { ApiController } from './api/api.controller';
import { AichatModule } from './aichat/aichat.module';
import { CriteriaModule } from './criteria/criteria.module';
import { OccupationModule } from './occupation/occupation.module';
import { UserTypeModule } from './user-type/user-type.module';
import { ProfessionModule } from './profession/profession.module';
import { OnBoardingModule } from './on-boarding/on-boarding.module';
import { SupportTicketModule } from './support-ticket/support-ticket.module';


@Module({
  
  controllers: [AppController, ApiController],
  providers: [AppService, ApiService, GlobalVariableContainer, AichatService],
  exports: [ApiService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // set to false in production
    }),
    TypeOrmModule.forFeature([User, Setting, Transaction, ChartOfAccount, Aichat]),
    UserModule,
    AuthModule,
    VerificationModule,
    SettingModule,
    TransactionModule,
    ChartOfAccountModule,
    AichatModule,
    CriteriaModule,
    OccupationModule,
    UserTypeModule,
    ProfessionModule,
    OnBoardingModule,
    SupportTicketModule
    ],
})
export class AppModule {}
