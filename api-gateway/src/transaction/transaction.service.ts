import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { IPagination } from './dto/paginate.dto';
import { Brackets, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ClientProxy } from '@nestjs/microservices';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { Observable } from 'rxjs';
import { IPage } from 'src/shared/interfaces/page.interface';

@Injectable()
export class TransactionService {
  constructor(@Inject('TRANSACTION_SERVICE') private client: ClientProxy) {}
  create(
    createTransactionDto: CreateTransactionDto,
  ): Observable<TransactionResponseDto> {
    console.log(createTransactionDto);
    return this.client.send(
      { cmd: 'create-transaction' },
      createTransactionDto,
    );
  }

  findAll(
    paginateParams: IPagination,
  ): Observable<IPage<TransactionResponseDto>> {
    console.log(paginateParams);
    return this.client.send({ cmd: 'get-transactions' }, paginateParams);
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
