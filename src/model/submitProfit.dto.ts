import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator'

export class SubmitProfitDto {
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

  @IsOptional()
  @IsString()
  description: string
}
