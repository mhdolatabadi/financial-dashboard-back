import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProfitService } from './profit.service';
import { SubmitProfitDto } from 'src/model/SubmitProfitDto';

@Controller('profit')
export class ProfitController {
  constructor(private readonly profitService: ProfitService) {}

  @Post()
  createTransaction(@Body() profit: SubmitProfitDto) {
    return this.profitService.submitProfit(profit);
  }

  @Get(':id')
  getAllTransactions(@Param('id') id: string) {
    return this.profitService.getProfits(id);
  }
}
