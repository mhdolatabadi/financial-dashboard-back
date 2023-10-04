import { Column, PrimaryColumn } from 'typeorm';
import { TransactionTypeEnum } from './TransactionTypeEnum';
import { UnitEnum } from './UnitEnum';

export class TransactionEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'timestamp' })
  date: number;

  @Column({ type: 'enum', enum: TransactionTypeEnum, enumName: 'type' })
  type: string;

  @Column({ type: 'float' })
  amount: number;

  @Column({
    type: 'enum',
    enum: UnitEnum,
    enumName: 'unit_enum',
    default: UnitEnum.Rial,
  })
  unit: string;

  @Column({ type: 'text' })
  description: string;
}
