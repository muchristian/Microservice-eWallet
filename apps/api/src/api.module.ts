import { runtimeConfig } from '@app/shared/config/app.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { CustomerModule } from './customer/customer.module';
import { TransactionModule } from './transaction/transaction.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [runtimeConfig],
    }),
    CustomerModule,
    WalletModule,
    TransactionModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
