import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  Logger,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import GenericResponse from '../shared/interfaces/generic-response';
import { IPage } from '../shared/interfaces/page.interface';
import { IPagination } from './dto/paginate.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  getGenericResponseSchema,
  getPaginatedSchema,
} from '../shared/utils/swagger.util';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Wallet } from './entities/wallet.entity';

@Controller('Wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @MessagePattern({ cmd: 'create-wallet' })
  async create(
    @Payload() createWalletDto: CreateWalletDto,
  ): Promise<GenericResponse<Wallet>> {
    console.log(createWalletDto);
    const result = await this.walletService.create(createWalletDto);
    return { message: 'Wallet create successfully', result };
  }

  @MessagePattern({ cmd: 'get-wallets' })
  async findAll(
    @Payload() query: IPagination,
  ): Promise<GenericResponse<IPage<Wallet>>> {
    const result = await this.walletService.findAll(query);
    return {
      message: 'Wallets retrieved successfully',
      result,
    };
  }
}
