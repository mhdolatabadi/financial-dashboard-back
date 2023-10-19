import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { SubmitTransactionDto } from 'src/model/SubmitTransactionDto'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactinService: TransactionService) {}

  @Post()
  createTransaction(@Body() transaction: SubmitTransactionDto) {
    return this.transactinService.createTransaction(transaction)
  }

  @Get(':id')
  getAllTransactions(@Param('id') id: string) {
    return this.transactinService.getTransactions(id)
  }
}
