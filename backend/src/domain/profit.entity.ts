import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { UnitEnum } from '../enums/unit.enum'
import { UserEntity } from './user.entity'
import { TransactionTypeEnum } from '../enums/transactionType.enum'

@Entity('profit')
export class ProfitEntity {
  @PrimaryColumn()
  id: string

  @Column({ type: 'timestamp' })
  date: Date

  @Column({ type: 'enum', enum: TransactionTypeEnum, enumName: 'type', default: TransactionTypeEnum.In })
  type: string

  @Column({ type: 'integer', default: 0 })
  amount: number

  @Column({
    type: 'enum',
    enum: UnitEnum,
    enumName: 'unit_enum',
    default: UnitEnum.Rial,
  })
  unit: string

  @Column({ type: 'text', nullable: true })
  description: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @Column()
  userId: string
}
