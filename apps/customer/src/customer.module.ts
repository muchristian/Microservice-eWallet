import { runtimeConfig } from '@app/shared/config/app.config';
import { serviceConnection } from '@app/shared/config/rabbitmq.config';
import { TypeOrmFactoryConfigService } from '@app/shared/config/typeorm-factory-config.service';
import { Customer } from '@app/shared/entities/customer.entity';
import { Wallet } from '@app/shared/entities/wallet.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Wallet]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [runtimeConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmFactoryConfigService,
    }),
    ClientsModule.register([
      { name: 'WALLET_SERVICE', ...serviceConnection('wallet-queue') },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
