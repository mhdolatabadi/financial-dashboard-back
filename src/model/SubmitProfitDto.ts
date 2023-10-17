import { IsDateString, IsNumber, IsString } from 'class-validator';

export class SubmitProfitDto {
  @IsString()
  username: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  amount: number;

  @IsString()
  unit: string;

  @IsString()
  description: string;
}
