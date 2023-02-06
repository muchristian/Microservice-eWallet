import { serviceConnection } from '@app/shared/config/rabbitmq.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CustomerModule } from './customer.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomerModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.connectMicroservice(serviceConnection('customer-queue'));
  app.startAllMicroservices();
  Logger.log('Microservice is listening');
}
bootstrap();
