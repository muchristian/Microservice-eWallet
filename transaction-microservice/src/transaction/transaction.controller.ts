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
  Logger,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import GenericResponse from '../shared/interfaces/generic-response';
import { IPage } from '../shared/interfaces/page.interface';
import { IPagination } from './dto/paginate.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  getGenericResponseSchema,
  getPaginatedSchema,
} from '../shared/utils/swagger.util';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Transaction } from './entities/transaction.entity';

@Controller('Transaction')
@ApiTags('Transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @MessagePattern({ cmd: 'create-transaction' })
  async create(
    @Payload() createTransactionDto: CreateTransactionDto,
  ): Promise<GenericResponse<Transaction>> {
    console.log(createTransactionDto);
    const result = await this.transactionService.create(createTransactionDto);
    return { message: 'Transaction create successfully', result };
  }

  @MessagePattern({ cmd: 'get-transactions' })
  async findAll(
    @Payload() query: IPagination,
  ): Promise<GenericResponse<IPage<Transaction>>> {
    const result = await this.transactionService.findAll(query);
    return {
      message: 'Transactions retrieved successfully',
      result,
    };
  }
}
