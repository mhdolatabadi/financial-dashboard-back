import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UnitEnum } from './UnitEnum';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  lastName: string;

  @Column({ type: 'char', length: 10, nullable: true })
  nationalNo: number;

  @Column({ type: 'float', nullable: true })
  financial: number;

  @Column({
    type: 'enum',
    enum: UnitEnum,
    enumName: 'unit_enum',
    default: UnitEnum.Rial,
  })
  unit: string;

  @Column({ type: 'float', nullable: true })
  totalProfit: number;

  @Column({ default: false })
  isAdmin: boolean;
}
