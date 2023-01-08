import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { IPagination } from './dto/paginate.dto';
import { Brackets, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import GenericResponse from 'src/shared/interfaces/generic-response';
import { IPage } from 'src/shared/interfaces/page.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<any> {
    console.log(createCustomerDto);
    const findCustomer = await this.customerRepo.findOne({
      where: {
        email: createCustomerDto.email,
      },
    });
    if (findCustomer)
      throw new ConflictException('Customer with provided email already exist');
    const result = await this.customerRepo.save({
      ...createCustomerDto,
    });

    return result;
  }

  async findAll(query: IPagination): Promise<IPage<Customer>> {
    const queryBuilder = this.customerRepo.createQueryBuilder('customer');
    queryBuilder.orderBy('customer.createdAt', 'DESC');
    const { items, meta } = await paginate(queryBuilder, query);
    return { items, ...meta };
  }
}
