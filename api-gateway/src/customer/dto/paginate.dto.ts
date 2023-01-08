import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class IPagination {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ default: 1, required: false })
  page: number;

  @ApiProperty({ default: 10, required: false })
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
