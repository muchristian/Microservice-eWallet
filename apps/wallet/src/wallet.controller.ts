import { Customer } from '@app/shared/entities/customer.entity';
import { Wallet } from '@app/shared/entities/wallet.entity';
import GenericResponse from '@app/shared/interfaces/generic-response';
import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { WalletService } from './wallet.service';

@Controller()
export class WalletServiceController {
  constructor(private readonly walletService: WalletService) {}

  @EventPattern('create-wallet')
  async create(
    @Payload() customer: Customer,
  ): Promise<GenericResponse<Wallet>> {
    return await this.walletService.create(customer);
  }

  @MessagePattern({ cmd: 'get-wallet' })
  async getOne(@Payload() id: string): Promise<GenericResponse<Wallet>> {
    return await this.walletService.findOne(+id);
  }
}
