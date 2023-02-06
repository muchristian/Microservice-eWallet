import { Customer } from '@app/shared/entities/customer.entity';
import { Transaction } from '@app/shared/entities/transaction.entity';
import { Wallet } from '@app/shared/entities/wallet.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Wallet, Customer])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
