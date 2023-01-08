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
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import GenericResponse from '../shared/interfaces/generic-response';
import { IPage } from 'src/shared/interfaces/page.interface';
import { IPagination } from './dto/paginate.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  getGenericResponseSchema,
  getPaginatedSchema,
} from '../shared/utils/swagger.util';
import { WalletResponseDto } from './dto/wallet-response.dto';
import { Observable } from 'rxjs';

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiCreatedResponse(getGenericResponseSchema(CreateWalletDto))
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createWalletDto: CreateWalletDto,
  ): GenericResponse<Observable<WalletResponseDto>> {
    const result = this.walletService.create(createWalletDto);
    return {
      message: 'Wallet create successfully',
      result,
    };
  }

  @Get()
  @ApiOkResponse(getPaginatedSchema(CreateWalletDto))
  findAll(
    @Query() paginateParams: IPagination,
  ): GenericResponse<Observable<IPage<WalletResponseDto>>> {
    return {
      message: 'Wallets returned successfully',
      result: this.walletService.findAll(paginateParams),
    };
  }
}
