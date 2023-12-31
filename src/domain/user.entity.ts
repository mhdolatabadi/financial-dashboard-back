import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { UnitEnum } from '../enums/unit.enum'
import { TransactionEntity } from './transaction.entity'
import { ProfitEntity } from './profit.entity'

@Entity('user')
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @Column({ type: 'varchar', length: 20, unique: true })
  username: string

  @Column({ type: 'text' })
  password: string

  @Column({ type: 'varchar', length: 20, nullable: true })
  firstname: string

  @Column({ type: 'varchar', length: 20, nullable: true })
  lastname: string

  @Column({ type: 'char', length: 10, nullable: true, name: 'national_no' })
  nationalNo: number

  @Column({ type: 'float', default: 0 })
  financial: number

  @Column({
    type: 'enum',
    enum: UnitEnum,
    enumName: 'unit_enum',
    default: UnitEnum.Dollar,
  })
  unit: string

  @Column({ type: 'float', name: 'total_profit', default: 0 })
  totalProfit: number

  @Column({ default: false, name: 'is_admin' })
  isAdmin: boolean

  @OneToMany(() => TransactionEntity, transaction => transaction.user)
  transactions: TransactionEntity[]

  @OneToMany(() => ProfitEntity, profit => profit.user)
  profits: ProfitEntity[]
}
