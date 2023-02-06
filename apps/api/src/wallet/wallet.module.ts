import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { serviceConnection } from '@app/shared/config/rabbitmq.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WALLET_SERVICE',
        ...serviceConnection('wallet-queue'),
      },
    ]),
  ],
  controllers: [WalletController],
})
export class WalletModule {}
