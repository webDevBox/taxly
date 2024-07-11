import { Injectable, Body } from '@nestjs/common'
import { Setting } from './entities/setting.entity'
import { User } from '../user/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { UpdateSettingDto } from './dto/update-setting.dto'
import { Criterion } from '../criteria/entities/criterion.entity'
import { UserType } from '../user-type/entities/user-type.entity'
import { Profession } from '../profession/entities/profession.entity'

@Injectable()
export class SettingService {

  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Criterion)
    private readonly criteriaRepository: Repository<Criterion>,
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
    @InjectRepository(Profession)
    private readonly professionRepository: Repository<Profession>,
  ) { }

  async update(id, request) {
    // Find the user by ID

    var user = await this.userRepository.findOne({ where: { id } })

    var setting = user.setting

    if(!setting)
    {
      const addSetting = new Setting()
      addSetting.user = id
      await this.settingRepository.save(addSetting)

      user = await this.userRepository.findOne({ where: { id } })

      setting = user.setting
    }

    // Update seting
    const updatedUser = await this.settingRepository.update(setting.id, request);

    this.updateCriteria(id)
    user = await this.userRepository.findOne({ where: { id } })

    setting = user.setting

    return setting;
  }

  async updateCriteria(id) {
    var user = await this.userRepository.findOne({ where: { id } })

    var setting = user.setting

    if (setting.work_status != null) {
      const userType = await this.userTypeRepository.findOne({
        where: {
          id: JSON.parse(setting.work_status)
        }
      })

      const criterias = await this.criteriaRepository.find({ where: { user_type: userType.name } })

      const updatedCriteria = []
      if (setting.criteria != null) {
        const values = JSON.parse(setting.criteria)
        values.map((value) => {
          if (!updatedCriteria.includes(value)) {
            updatedCriteria.push(value)
          }
        })
      }

      criterias.map((criteria) => {
        const values = JSON.parse(criteria.values)
        values.map((value) => {
          if (!updatedCriteria.includes(value)) {
            updatedCriteria.push(value)
          }
        })
      })
      await this.settingRepository.update(setting.id, { criteria: JSON.stringify(updatedCriteria) })
    }


    if (setting.profession != null) {
      const profession = await this.professionRepository.findOne({
        where: {
          id: JSON.parse(setting.profession)
        }
      })

      const occupation = profession.occupation_id

      const criterias = await this.criteriaRepository.
        createQueryBuilder('criterion')
        .where(`CONCAT(',', criterion.occupation, ',') LIKE :occupation`, {
          occupation: `%${occupation}%`,
        })
        .getMany()

      const updatedCriteriaProfession = []
      if (setting.criteria != null) {
        const values = JSON.parse(setting.criteria)
        values.map((value) => {
          if (!updatedCriteriaProfession.includes(value)) {
            updatedCriteriaProfession.push(value)
          }
        })
      }

      criterias.map((criteria) => {
        const values = JSON.parse(criteria.values)
        values.map((value) => {
          if (!updatedCriteriaProfession.includes(value)) {
            updatedCriteriaProfession.push(value)
          }
        })
      })
      await this.settingRepository.update(setting.id, { criteria: JSON.stringify(updatedCriteriaProfession) })

    }


  }

}
