import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class EditUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  nationalNo: number;

  @IsString()
  financial: number;

  @IsString()
  unit: string;

  @IsString()
  totalProfit: number;
}
