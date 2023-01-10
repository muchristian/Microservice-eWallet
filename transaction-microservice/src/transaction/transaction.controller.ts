import { Controller } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import GenericResponse from '../shared/interfaces/generic-response';
import { IPage } from '../shared/interfaces/page.interface';
import { IPagination } from './dto/paginate.dto';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Transaction } from './entities/transaction.entity';
import { FilterDto } from './dto/filter-transaction.dto';

@Controller('Transaction')
@ApiTags('Transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @MessagePattern({ cmd: 'create-transaction' })
  async create(
    @Payload() createTransactionDto: CreateTransactionDto,
  ): Promise<GenericResponse<Transaction>> {
    return await this.transactionService.create(createTransactionDto);
  }

  @MessagePattern({ cmd: 'get-transactions' })
  async findAll(
    @Payload() query: { paginateParams: IPagination; filterOptions: FilterDto },
  ): Promise<GenericResponse<IPage<Transaction>>> {
    return await this.transactionService.findAll(query);
  }
}
