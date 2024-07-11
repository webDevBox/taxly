import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Setting } from '../setting/entities/setting.entity'
import { User } from '../user/entities/user.entity'
import { Criterion } from '../criteria/entities/criterion.entity'
import { UserType } from '../user-type/entities/user-type.entity'
import { Profession } from '../profession/entities/profession.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User,Setting,Criterion,UserType,Profession])],
  controllers: [SettingController],
  providers: [SettingService, JwtService]
})
export class SettingModule {}
