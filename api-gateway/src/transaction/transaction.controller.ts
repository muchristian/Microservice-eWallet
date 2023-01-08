import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import GenericResponse from '../shared/interfaces/generic-response';
import { IPage } from 'src/shared/interfaces/page.interface';
import { IPagination } from './dto/paginate.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  getGenericResponseSchema,
  getPaginatedSchema,
} from '../shared/utils/swagger.util';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { Observable } from 'rxjs';

@Controller('transaction')
@ApiTags('Transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiCreatedResponse(getGenericResponseSchema(CreateTransactionDto))
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): GenericResponse<Observable<TransactionResponseDto>> {
    const result = this.transactionService.create(createTransactionDto);
    return {
      message: 'Transaction create successfully',
      result,
    };
  }

  @Get()
  @ApiOkResponse(getPaginatedSchema(CreateTransactionDto))
  findAll(
    @Query() paginateParams: IPagination,
  ): GenericResponse<Observable<IPage<TransactionResponseDto>>> {
    return {
      message: 'Transactions returned successfully',
      result: this.transactionService.findAll(paginateParams),
    };
  }
}
