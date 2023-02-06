import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { transactionTypes } from '../enums/transactionTypes';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  receiverId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(transactionTypes)
  type: transactionTypes;
}
