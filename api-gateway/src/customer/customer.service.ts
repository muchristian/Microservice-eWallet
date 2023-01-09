import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { IPagination } from './dto/paginate.dto';
import { Brackets, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { Observable } from 'rxjs';
import { IPage } from 'src/shared/interfaces/page.interface';

@Injectable()
export class CustomerService {
  constructor(@Inject('CUSTOMER_SERVICE') private client: ClientProxy) {}
  create(createCustomerDto: CreateCustomerDto) {
    console.log(createCustomerDto);
    this.client.send('create-customer', { ...createCustomerDto });
  }

  findAll(paginateParams: IPagination): Observable<IPage<CustomerResponseDto>> {
    console.log(paginateParams);
    return this.client.send({ cmd: 'get-customers' }, paginateParams);
  }

  // async onApplicationBootstrap() {
  //   await this.client.connect();
  // }
}
