import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProfitEntity } from 'src/domain/ProfitEntity'
import { TransactionTypeEnum } from 'src/domain/TransactionTypeEnum'
import { UserEntity } from 'src/domain/UserEntity'
import { SubmitProfitDto } from 'src/model/SubmitProfitDto'
import { DataSource, Repository } from 'typeorm'
import { v4 } from 'uuid'

@Injectable()
export class ProfitService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ProfitEntity)
    private readonly profitRepository: Repository<ProfitEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async submitProfit(profit: SubmitProfitDto) {
    const user = await this.userRepository.findOne({
      where: { username: profit.username },
    })
    const { amount, date, description, unit, type } = profit
    const id = v4()
    return this.dataSource.transaction(() => {
      if (type === TransactionTypeEnum.In) {
        user.financial += amount
        user.totalProfit += amount
      } else {
        user.financial -= amount
        user.totalProfit -= amount
      }
      this.userRepository.save(user)
      return this.profitRepository.insert({
        id,
        amount,
        date,
        description,
        unit,
        type,
        userId: user.id,
      })
    })
  }

  getProfits(userId: string) {
    return this.profitRepository.find({ where: { userId } })
  }

  async deleteProfit(id: string) {
    const profit = await this.profitRepository.findOne({ where: { id } })
    if (!profit) throw new NotFoundException('profit with given id not found')
    this.profitRepository.remove(profit)
  }
}
