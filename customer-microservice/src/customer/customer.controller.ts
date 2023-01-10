import { Controller } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import GenericResponse from '../shared/interfaces/generic-response';
import { IPage } from 'src/shared/interfaces/page.interface';
import { IPagination } from './dto/paginate.dto';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Customer } from './entities/customer.entity';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern({ cmd: 'create-customer' })
  async create(
    @Payload() createCustomerDto: CreateCustomerDto,
  ): Promise<GenericResponse<Customer>> {
    return await this.customerService.create(createCustomerDto);
  }

  @MessagePattern({ cmd: 'get-customer' })
  async getOne(@Payload() id: string): Promise<GenericResponse<Customer>> {
    return await this.customerService.findOne(+id);
  }
}
