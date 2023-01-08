import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import BaseEntity from '../../shared/interfaces/base.entity';

export class CreateWalletDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  balance?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  customerId: number;
}
