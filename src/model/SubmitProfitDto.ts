import { IsNumber, IsString } from 'class-validator';

export class SubmitProfitDto {
  @IsString()
  username: string;

  @IsNumber()
  date: number;

  @IsNumber()
  amount: number;

  @IsString()
  unit: string;

  @IsString()
  description: string;
}
