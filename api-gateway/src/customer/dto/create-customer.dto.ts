import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import BaseEntity from '../../shared/interfaces/base.entity';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ default: 'markjoker7@gmail.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ default: '+250781684599' })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
