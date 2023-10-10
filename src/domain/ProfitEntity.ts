import { Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { UnitEnum } from './UnitEnum';
import { UserEntity } from './UserEntity';

export class ProfitEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'timestamp' })
  date: number;

  @Column({ type: 'integer', default: 0 })
  amount: number;

  @Column({
    type: 'enum',
    enum: UnitEnum,
    enumName: 'unit_enum',
    default: UnitEnum.Rial,
  })
  unit: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
