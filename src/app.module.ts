import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TransactionService } from './transaction/transaction.service';
import { ProfitService } from './profit/profit.service';
import { ProfitEntity } from './domain/ProfitEntity';
import { UserEntity } from './domain/UserEntity';
import { TransactionEntity } from './domain/TransactionEntity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      password: 'password',
      username: process.env.DB_USER,
      entities: [ProfitEntity, UserEntity, TransactionEntity],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, TransactionService, ProfitService],
})
export class AppModule {}
