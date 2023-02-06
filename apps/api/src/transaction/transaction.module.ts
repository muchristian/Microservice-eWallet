import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { ClientsModule } from '@nestjs/microservices';
import { serviceConnection } from '@app/shared/config/rabbitmq.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRANSACTION_SERVICE',
        ...serviceConnection('transaction-queue'),
      },
    ]),
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
