import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { transactionTypes } from 'src/shared/enums/transactionTypes';
import BaseEntity from '../../shared/interfaces/base.entity';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(transactionTypes)
  type: transactionTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  walletId: number;
}
