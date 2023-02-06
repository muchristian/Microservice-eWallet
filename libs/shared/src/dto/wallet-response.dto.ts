import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { CustomerResponseDto } from 'src/customer/dto/customer-response.dto';
import BaseEntity from '../../shared/interfaces/base.entity';

export class WalletResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  balance: number;

  @ApiProperty()
  customer: CustomerResponseDto;
}
