import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user/user.controller'
import { UserService } from './user/user.service'
import { TransactionService } from './transaction/transaction.service'
import { ProfitService } from './profit/profit.service'
import { ProfitEntity } from './domain/ProfitEntity'
import { UserEntity } from './domain/UserEntity'
import { TransactionEntity } from './domain/TransactionEntity'
import { TransactionController } from './transaction/transaction.controller'
import { ProfitController } from './profit/profit.controller'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth/auth.guard'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './auth/constants'
import { AuthService } from './auth/auth.service'
import { AuthController } from './auth/auth.controller'

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
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
    TypeOrmModule.forFeature([UserEntity, TransactionEntity, ProfitEntity]),
  ],
  controllers: [
    UserController,
    TransactionController,
    ProfitController,
    AuthController,
  ],
  providers: [
    // { provide: APP_GUARD, useClass: AuthGuard },
    UserService,
    TransactionService,
    ProfitService,
    AuthService,
  ],
})
export class AppModule {}
