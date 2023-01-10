import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedModule } from 'src/shared/utils/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
          ],
          queue: 'customer-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
