import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import BaseEntity from '../../shared/interfaces/base.entity';
import { Customer } from './customer.entity';

@Entity('wallet')
export class Wallet extends BaseEntity {
  @Column({
    default: 0,
  })
  @ApiProperty()
  balance: number;

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;
}
