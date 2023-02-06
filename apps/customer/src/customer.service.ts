import { CreateCustomerDto } from '@app/shared/dto/create-customer.dto';
import { Customer } from '@app/shared/entities/customer.entity';
import { Wallet } from '@app/shared/entities/wallet.entity';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
    @Inject('WALLET_SERVICE') private client: ClientProxy,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<any> {
    const findCustomer = await this.customerRepo.findOne({
      where: {
        email: createCustomerDto.email,
      },
    });
    if (findCustomer)
      return new ConflictException(
        'Customer with provided email already exist',
      ).getResponse();
    const result = await this.customerRepo.save({
      ...createCustomerDto,
    });

    this.client.emit('create-wallet', result);
    return {
      message: 'Customer create successfully with his wallet',
      result,
    };
  }

  async findMany(): Promise<Customer[] | any> {
    const customers = await this.customerRepo.find({
      relations: ['wallet'],
    });

    if (customers.length <= 0) {
      return new NotFoundException('Customers not found').getResponse();
    }
    return {
      message: 'Customers retrieved successfully',
      result: customers,
    };
  }
}
