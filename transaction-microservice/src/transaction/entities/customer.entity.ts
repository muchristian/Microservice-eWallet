import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseEntity from '../../shared/interfaces/base.entity';

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
}
