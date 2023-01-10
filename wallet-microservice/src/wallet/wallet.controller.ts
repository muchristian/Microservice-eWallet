import { Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';
import GenericResponse from '../shared/interfaces/generic-response';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Wallet } from './entities/wallet.entity';

@Controller('Wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @MessagePattern({ cmd: 'get-wallet' })
  async getOne(@Payload() id: string): Promise<GenericResponse<Wallet>> {
    return await this.walletService.findOne(+id);
  }
}
