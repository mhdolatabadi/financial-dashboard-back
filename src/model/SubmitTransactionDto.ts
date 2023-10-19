import { IsDateString, IsNumber, IsString } from 'class-validator'

export class SubmitTransactionDto {
  @IsString()
  username: string

  @IsDateString()
  date: Date

  @IsString()
  type: string

  @IsNumber()
  amount: number

  @IsString()
  unit: string

  @IsString()
  description: string
}
