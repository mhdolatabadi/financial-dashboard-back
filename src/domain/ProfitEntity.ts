import { Column, PrimaryColumn } from 'typeorm';
import { UnitEnum } from './UnitEnum';

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
}
