import { serviceConnection } from '@app/shared/config/rabbitmq.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { CustomerModule } from './customer.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomerModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.connectMicroservice({
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
  });
  app.startAllMicroservices();
  Logger.log('Microservice is listening');
}
bootstrap();
