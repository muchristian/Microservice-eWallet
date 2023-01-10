import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpStatus,
  HttpCode,
  Inject,
  ConflictException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { IPagination } from './dto/paginate.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  getGenericResponseSchema,
  getPaginatedSchema,
} from '../shared/utils/swagger.util';
import { ClientProxy } from '@nestjs/microservices';
import { FilterDto } from './dto/filter-transaction.dto';

@Controller('transaction')
@ApiTags('Transaction')
export class TransactionController {
  constructor(@Inject('TRANSACTION_SERVICE') private client: ClientProxy) {}

  @Post()
  @ApiCreatedResponse(getGenericResponseSchema(CreateTransactionDto))
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createTransactionDto: CreateTransactionDto, // GenericResponse<Observable<TransactionResponseDto>>
  ) {
    if (createTransactionDto.amount <= 0) {
      return new ConflictException('Please enter amount').getResponse();
    }
    if (createTransactionDto.senderId === createTransactionDto.receiverId)
      return new ConflictException(
        'Sender should not be receiver',
      ).getResponse();
    return this.client.send(
      { cmd: 'create-transaction' },
      createTransactionDto,
    );
  }

  @Get()
  @ApiOkResponse(getPaginatedSchema(CreateTransactionDto))
  @ApiQuery({ name: 'type', required: false })
  findAll(
    @Query() paginateParams: IPagination,
    @Query() filterOptions: FilterDto, // GenericResponse<Observable<IPage<TransactionResponseDto>>>
  ) {
    return this.client.send(
      { cmd: 'get-transactions' },
      { paginateParams, filterOptions },
    );
  }
}
