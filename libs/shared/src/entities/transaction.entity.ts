import { ApiProperty } from '@nestjs/swagger';
import { transactionStatus } from '../enums/transactionStatus';
import { transactionTypes } from '../enums/transactionTypes';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../interfaces/base.entity';
import { Customer } from './customer.entity';
import { Wallet } from './wallet.entity';

@Entity('transaction')
export class Transaction extends BaseEntity {
  @Column({
    default: 0,
  })
  @ApiProperty()
  amount: number;

  @Column({
    nullable: false,
  })
  @ApiProperty()
  type: transactionTypes;

  @Column({
    nullable: false,
  })
  @ApiProperty()
  status: transactionStatus;

  @Column({
    nullable: false,
  })
  @ApiProperty()
  reference: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  details: string;

  @ManyToOne(() => Wallet)
  @JoinColumn()
  wallet: Wallet;

  @ManyToOne(() => Customer)
  @JoinColumn()
  sender: Customer;

  @ManyToOne(() => Customer)
  @JoinColumn()
  receiver: Customer;
}
