import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { SubmitTransactionDto } from '../model'

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

  @Delete(':id')
  deleteTransaction(@Param('id') id: string) {
    return this.transactinService.deleteTransaction(id)
  }
}
