import { serviceConnection } from '@app/shared/config/rabbitmq.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { WalletModule } from './wallet.module';

async function bootstrap() {
  const app = await NestFactory.create(WalletModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.connectMicroservice(serviceConnection('wallet-queue'));

  app.startAllMicroservices();
  Logger.log('Microservice is listening');
}
bootstrap();
