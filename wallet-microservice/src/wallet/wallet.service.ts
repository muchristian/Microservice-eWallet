import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { IPagination } from './dto/paginate.dto';
import { Brackets, Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import GenericResponse from '../shared/interfaces/generic-response';
import { IPage } from '../shared/interfaces/page.interface';
import { Customer } from './entities/customer.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<any> {
    console.log(createWalletDto);
    const customer = await this.customerRepo.findOne({
      where: {
        id: createWalletDto.customerId,
      },
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    const result = await this.walletRepo.save({
      customer: customer,
      ...createWalletDto,
    });
    return result;
  }

  async findAll(query: IPagination): Promise<IPage<Wallet>> {
    const queryBuilder = this.walletRepo.createQueryBuilder('wallet');
    queryBuilder.leftJoinAndSelect('wallet.customer', 'customer');
    queryBuilder.orderBy('wallet.createdAt', 'DESC');
    const { items, meta } = await paginate(queryBuilder, query);
    return { items, ...meta };
  }
}
