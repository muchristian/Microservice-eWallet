import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { IPagination } from './dto/paginate.dto';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import GenericResponse from 'src/shared/interfaces/generic-response';
import { IPage } from 'src/shared/interfaces/page.interface';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
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

    const wallet = await this.walletRepo.save({
      customer: result,
    });
    const response = {
      ...result,
      wallet: { id: wallet.id, balance: wallet.balance },
    };
    return {
      message: 'Customer create successfully with his wallet',
      response,
    };
  }

  async findOne(): Promise<Customer | any> {
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
