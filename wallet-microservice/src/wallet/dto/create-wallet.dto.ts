import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Customer } from '../entities/customer.entity';

export class CreateWalletDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  customerId: number;
}
