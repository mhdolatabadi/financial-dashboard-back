import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { v4 } from 'uuid'
import { ProfitEntity, UserEntity } from '../domain'
import { SubmitProfitDto } from '../model'
import { TransactionTypeEnum } from '../enums'

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
    this.dataSource.transaction(() => {
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
    return id
  }

  getProfits(userId: string) {
    return this.profitRepository.find({ where: { userId } })
  }

  async deleteProfit(id: string) {
    const profit = await this.profitRepository.findOne({ where: { id } })
    if (!profit) throw new NotFoundException('profit with given id not found')

    const user = await this.userRepository.findOne({
      where: { id: profit.userId },
    })
    if (!user) throw new NotFoundException('user not found')
    user.financial =
      profit.type === TransactionTypeEnum.In
        ? user.financial - profit.amount
        : user.financial + profit.amount
    user.totalProfit =
      profit.type === TransactionTypeEnum.In
        ? user.totalProfit - profit.amount
        : user.totalProfit + profit.amount
    return this.dataSource.transaction(() => {
      this.userRepository.save(user)
      return this.profitRepository.remove(profit)
    })
  }
}
