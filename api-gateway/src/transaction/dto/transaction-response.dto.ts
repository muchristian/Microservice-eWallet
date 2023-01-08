import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { CustomerResponseDto } from 'src/customer/dto/customer-response.dto';
import { transactionTypes } from 'src/shared/enums/transactionTypes';
import { WalletResponseDto } from 'src/wallet/dto/wallet-response.dto';
import BaseEntity from '../../shared/interfaces/base.entity';

export class TransactionResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsEnum(transactionTypes)
  type: transactionTypes;

  @ApiProperty()
  @IsString()
  reference: string;

  @ApiProperty()
  @IsNumber()
  details?: string;

  @ApiProperty()
  wallet: WalletResponseDto;

  @ApiProperty()
  customer: CustomerResponseDto;
}
