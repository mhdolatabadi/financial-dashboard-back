import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/UserEntity';
import { CreateUserDto } from 'src/model/CreateUserDto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private userRepository: Repository<UserEntity>) {}

  createUser(createDto: CreateUserDto) {
    this.userRepository.create(createDto);
  }
}
