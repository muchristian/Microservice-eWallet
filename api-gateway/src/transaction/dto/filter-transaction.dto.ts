import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { transactionTypes } from 'src/shared/enums/transactionTypes';
export class FilterDto {
  @ApiProperty()
  customerId: number;

  @ApiProperty({ default: transactionTypes.debit })
  @IsOptional()
  type?: transactionTypes;
}
