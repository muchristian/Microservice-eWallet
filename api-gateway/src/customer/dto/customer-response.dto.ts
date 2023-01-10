import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import BaseEntity from '../../shared/interfaces/base.entity';

export class CustomerResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsDateString()
  createdAt: Date;
}
