import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { IPagination } from './dto/paginate.dto';
import { Brackets, Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { ClientProxy } from '@nestjs/microservices';
import { WalletResponseDto } from './dto/wallet-response.dto';
import { Observable } from 'rxjs';
import { IPage } from 'src/shared/interfaces/page.interface';

@Injectable()
export class WalletService {
  constructor(@Inject('WALLET_SERVICE') private client: ClientProxy) {}
  create(createWalletDto: CreateWalletDto): Observable<WalletResponseDto> {
    console.log(createWalletDto);
    return this.client.send({ cmd: 'create-wallet' }, createWalletDto);
  }

  findAll(paginateParams: IPagination): Observable<IPage<WalletResponseDto>> {
    console.log(paginateParams);
    return this.client.send({ cmd: 'get-wallets' }, paginateParams);
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
