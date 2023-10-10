export class CreateUserDto {
  username: string;
  password: string;
}

export class EditUserDto {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  nationalNo: number;
  financial: number;
  unit: string;
  totalProfit: number;
}
