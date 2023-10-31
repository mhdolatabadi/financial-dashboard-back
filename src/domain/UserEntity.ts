import { Column, Entity, PrimaryColumn } from 'typeorm'
import { UnitEnum } from './UnitEnum'

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

  @Column({ type: 'float', nullable: true })
  financial: number

  @Column({
    type: 'enum',
    enum: UnitEnum,
    enumName: 'unit_enum',
    default: UnitEnum.Rial,
  })
  unit: string

  @Column({ type: 'float', nullable: true, name: 'total_profit' })
  totalProfit: number

  @Column({ default: false, name: 'is_admin' })
  isAdmin: boolean
}
