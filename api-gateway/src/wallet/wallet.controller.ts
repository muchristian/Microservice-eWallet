import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { getGenericResponseSchema } from '../shared/utils/swagger.util';
import { ClientProxy } from '@nestjs/microservices';

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor(@Inject('WALLET_SERVICE') private client: ClientProxy) {}

  @Get(':id')
  @ApiOkResponse(getGenericResponseSchema(CreateWalletDto))
  @ApiParam({ name: 'id' })
  findOne(
    @Param('id') id: string, // : GenericResponse<Observable<IPage<CustomerResponseDto>>>
  ) {
    return this.client.send({ cmd: 'get-wallet' }, id);
  }
}
