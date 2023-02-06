import { runtimeConfig } from '@app/shared/config/app.config';
import { TypeOrmFactoryConfigService } from '@app/shared/config/typeorm-factory-config.service';
import { Customer } from '@app/shared/entities/customer.entity';
import { Wallet } from '@app/shared/entities/wallet.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletServiceController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet, Customer]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [runtimeConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmFactoryConfigService,
    }),
  ],
  controllers: [WalletServiceController],
  providers: [WalletService],
})
export class WalletModule {}
