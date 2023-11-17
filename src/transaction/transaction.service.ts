import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TransactionEntity } from 'src/domain/TransactionEntity'
import { TransactionTypeEnum } from 'src/domain/TransactionTypeEnum'
import { UserEntity } from 'src/domain/UserEntity'
import { SubmitTransactionDto } from 'src/model/SubmitTransactionDto'
import { DataSource, Repository } from 'typeorm'
import { v4 } from 'uuid'

@Injectable()
export class TransactionService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  
  async createTransaction(createDto: SubmitTransactionDto) {
    const user = await this.userRepository.findOne({
      where: { username: createDto.username },
    })
    const { amount, date, type, unit, description } = createDto
    const id = v4()
    return this.dataSource.transaction(() => {
      user.financial =
        type === TransactionTypeEnum.In
          ? user.financial + amount
          : user.financial - amount
      this.userRepository.save(user)
      return this.transactionRepository.insert({
        id,
        amount,
        date,
        type,
        unit,
        description,
        userId: user.id,
      })
    })
  }

  getTransactions(userId: string) {
    return this.transactionRepository.find({ where: { userId } })
  }

  async deleteTransaction(id: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    })
    if (!transaction)
      throw new NotFoundException('transaction with given id not found')
    this.transactionRepository.remove(transaction)
  }
}
