import { Controller } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from '../../../libs/shared/src/dto/create-customer.dto';
import GenericResponse from '@app/shared/interfaces/generic-response';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Customer } from '@app/shared/entities/customer.entity';

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

  @MessagePattern({ cmd: 'get-customers' })
  async getMany(): Promise<GenericResponse<Customer[]>> {
    return await this.customerService.findMany();
  }
}
