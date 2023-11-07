import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProfitEntity } from 'src/domain/ProfitEntity'
import { UserEntity } from 'src/domain/UserEntity'
import { SubmitProfitDto } from 'src/model/SubmitProfitDto'
import { Repository } from 'typeorm'
import { v4 } from 'uuid'

@Injectable()
export class ProfitService {
  constructor(
    @InjectRepository(ProfitEntity)
    private readonly profitRepository: Repository<ProfitEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async submitProfit(profit: SubmitProfitDto) {
    const { id: userId } = await this.userRepository.findOne({
      select: { id: true },
      where: { username: profit.username },
    })
    const { amount, date, description, unit } = profit
    const id = v4()
    return this.profitRepository.insert({
      id,
      amount,
      date,
      description,
      unit,
      userId,
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
