import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from '@app/shared/dto/create-transaction.dto';
import { Wallet } from '@app/shared/entities/wallet.entity';
import GenericResponse from '@app/shared/interfaces/generic-response';
import { Customer } from '@app/shared/entities/customer.entity';
import { Transaction } from '@app/shared/entities/transaction.entity';
import { transactionTypes } from '@app/shared/enums/transactionTypes';
import { FilterDto } from '@app/shared/dto/filter-transaction.dto';
import { transactionStatus } from '@app/shared/enums/transactionStatus';

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
    const sender = await this.customerRepo.findOne({
      where: {
        id: createTransactionDto.senderId,
      },
    });
    if (!sender) {
      return new NotFoundException('Sender not found').getResponse();
    }

    const receiver = await this.customerRepo.findOne({
      where: {
        id: createTransactionDto.receiverId,
      },
    });
    if (!receiver) {
      return new NotFoundException('Receiver not found').getResponse();
    }
    const wallet = await this.walletRepo.findOne({
      where: {
        id: sender.id,
      },
    });

    if (wallet) {
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
        sender: sender,
        receiver: receiver,
        wallet: wallet,
        status: transactionStatus.success,
        reference: `${Math.floor(Math.random() * 10)}`,
        ...createTransactionDto,
      });
      return { message: 'Transaction create successfully', result };
    }
  }

  async findAll(query: {
    filterOptions: FilterDto;
  }): Promise<GenericResponse<Transaction[]> | any> {
    const { customerId, type } = query.filterOptions;
    const customer = await this.customerRepo.findOne({
      where: {
        id: customerId,
      },
    });
    if (!customer) {
      return new NotFoundException('Customer not found').getResponse();
    }

    const queryBuilder = this.transactionRepo.createQueryBuilder('transaction');
    queryBuilder.leftJoinAndSelect('transaction.sender', 'sender');
    queryBuilder.leftJoinAndSelect('transaction.receiver', 'receiver');
    queryBuilder.leftJoinAndSelect('transaction.wallet', 'wallet');
    queryBuilder.where('sender.id = :senderId', {
      senderId: customer.id,
    });
    if (type) {
      queryBuilder.andWhere('transaction.type = :type', {
        type,
      });
    }
    queryBuilder.orderBy('transaction.createdAt', 'DESC');
    queryBuilder.getMany();
    return {
      message: 'Transactions retrieved successfully',
      result: queryBuilder,
    };
  }
}
