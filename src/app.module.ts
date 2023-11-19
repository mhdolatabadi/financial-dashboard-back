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
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './auth/constants'
import { AuthService } from './auth/auth.service'
import { AuthController } from './auth/auth.controller'
import { getConfig, getOrmConfig } from './app.config'

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.default'],
      load: [getConfig],
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(getOrmConfig()),
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
