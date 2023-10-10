import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/UserEntity';
import { CreateUserDto, EditUserDto } from 'src/model/CreateUserDto';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createDto: CreateUserDto) {
    const id = v4();
    try {
      await this.userRepository.insert({ id: v4(), ...createDto });
    } catch (e) {
      throw new BadRequestException('username is redundant');
    }
    return id;
  }

  getUser(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  getUsers() {
    return this.userRepository.find({ select: { id: true, username: true } });
  }

  updateUser(id: string, createDto: Partial<EditUserDto>) {
    return this.userRepository.update(id, createDto);
  }

  deleteUser(id: string) {
    this.userRepository.delete(id);
  }
}
