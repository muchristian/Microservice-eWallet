import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { IPagination } from './dto/paginate.dto';
import { Brackets, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Wallet } from './entities/wallet.entity';
import GenericResponse from '../shared/interfaces/generic-response';
import { IPage } from '../shared/interfaces/page.interface';
import { Customer } from './entities/customer.entity';
import { Transaction } from './entities/transaction.entity';
import { transactionTypes } from 'src/shared/enums/transactionTypes';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<any> {
    console.log(createTransactionDto);
    const customer = await this.customerRepo.findOne({
      where: {
        id: createTransactionDto.customerId,
      },
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const wallet = await this.walletRepo.findOne({
      where: {
        id: createTransactionDto.walletId,
      },
    });
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    if (
      wallet.balance < createTransactionDto.amount &&
      createTransactionDto.type === transactionTypes.debit
    ) {
      throw new BadRequestException('There is no enough money on balance');
    }

    await this.walletRepo.save({
      balance:
        createTransactionDto.type === transactionTypes.credit
          ? wallet.balance + createTransactionDto.amount
          : wallet.balance - createTransactionDto.amount,
    });

    const result = await this.transactionRepo.save({
      customer: customer,
      wallet: wallet,
      reference: `${Math.floor(Math.random() * 10)}`,
      ...createTransactionDto,
    });
    return result;
  }

  async findAll(query: IPagination): Promise<IPage<Transaction>> {
    const queryBuilder = this.transactionRepo.createQueryBuilder('transaction');
    queryBuilder.leftJoinAndSelect('transaction.customer', 'customer');
    queryBuilder.leftJoinAndSelect('transaction.wallet', 'wallet');
    queryBuilder.orderBy('transaction.createdAt', 'DESC');
    queryBuilder.getMany();
    const { items, meta } = await paginate(queryBuilder, query);
    return { items, ...meta };
  }
}
