import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CustomerResponseDto } from 'src/customer/dto/customer-response.dto';
import { transactionTypes } from 'src/shared/enums/transactionTypes';

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
  sender: CustomerResponseDto;

  @ApiProperty()
  receiverId: CustomerResponseDto;
}
