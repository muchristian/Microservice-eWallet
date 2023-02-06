import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '@app/shared/entities/wallet.entity';
import { Customer } from '@app/shared/entities/customer.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  async create(customer: Customer): Promise<Customer | any> {
    const wallet = await this.walletRepo.save({
      customer,
    });
    return wallet;
  }

  async findOne(id: number): Promise<Customer | any> {
    const wallet = await this.walletRepo.findOne({
      where: {
        id,
      },
      relations: ['customer'],
    });
    if (!wallet) {
      return new NotFoundException('Wallet not found').getResponse();
    }
    return {
      message: 'Wallet retrieved successfully',
      result: wallet,
    };
  }
}
