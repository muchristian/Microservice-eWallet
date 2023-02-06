import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne } from 'typeorm';
import BaseEntity from '../interfaces/base.entity';
import { Wallet } from './wallet.entity';

@Entity('customer')
export class Customer extends BaseEntity {
  @Column({
    nullable: false,
  })
  @ApiProperty()
  firstname: string;

  @Column({
    nullable: false,
  })
  @ApiProperty()
  lastname: string;

  @Column({
    nullable: false,
  })
  @ApiProperty()
  email: string;

  @Column({
    nullable: false,
  })
  @ApiProperty()
  phone: string;

  @OneToOne(() => Wallet, (wallet: Wallet) => wallet.customer)
  wallet: Wallet;
}
