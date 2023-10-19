import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, EditUserDto } from 'src/model/CreateUserDto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user)
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(id)
  }

  @Get('username/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username)
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers()
  }

  @Put(':id')
  editUser(@Param('id') id: string, @Body() partialUser: Partial<EditUserDto>) {
    return this.userService.updateUser(id, partialUser)
  }
}
