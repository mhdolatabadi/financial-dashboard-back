import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto } from 'src/model/CreateUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Put(':id')
  editUser(@Param('id') id: string, @Body() partialUser: Partial<EditUserDto>) {
    return this.userService.updateUser(id, partialUser);
  }
}
