import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/UserEntity';
import { CreateUserDto, EditUserDto } from 'src/model/CreateUserDto';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createDto: CreateUserDto) {
    const id = v4();
    const saltRounds = 10;
    const hash = await bcrypt.hash(createDto.password, saltRounds);

    try {
      await this.userRepository.insert({
        ...createDto,
        id: v4(),
        password: hash,
      });
    } catch (e) {
      throw new BadRequestException('username is redundant');
    }
    return id;
  }

  getUserById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  getUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  getAllUsers() {
    return this.userRepository.find({ select: { id: true, username: true } });
  }

  async updateUser(id: string, createDto: Partial<EditUserDto>) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.userRepository.update(id, createDto);
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    this.userRepository.remove(user);
  }
}
