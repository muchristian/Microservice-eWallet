import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { serviceConnection } from '@app/shared/config/rabbitmq.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER_SERVICE',
        ...serviceConnection('customer-queue'),
      },
    ]),
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
