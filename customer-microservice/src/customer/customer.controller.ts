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
  Logger,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import GenericResponse from '../shared/interfaces/generic-response';
import { IPage } from 'src/shared/interfaces/page.interface';
import { IPagination } from './dto/paginate.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  getGenericResponseSchema,
  getPaginatedSchema,
} from '../shared/utils/swagger.util';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Customer } from './entities/customer.entity';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern('create-customer')
  async create(
    @Payload() createCustomerDto: CreateCustomerDto,
  ): Promise<GenericResponse<Customer>> {
    console.log(createCustomerDto);
    const result = await this.customerService.create(createCustomerDto);
    return { message: 'Customer create successfully', result };
  }

  @MessagePattern({ cmd: 'get-customers' })
  async findAll(
    @Payload() query: IPagination,
  ): Promise<GenericResponse<IPage<Customer>>> {
    const result = await this.customerService.findAll(query);
    return {
      message: 'Customers retrieved successfully',
      result,
    };
  }
}
