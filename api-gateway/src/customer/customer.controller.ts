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
import { CustomerResponseDto } from './dto/customer-response.dto';
import { Observable } from 'rxjs';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiCreatedResponse(getGenericResponseSchema(CreateCustomerDto))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCustomerDto: CreateCustomerDto) {
    const result = this.customerService.create(createCustomerDto);
    return {
      message: 'Customer create successfully',
      result,
    };
  }

  @Get()
  @ApiOkResponse(getPaginatedSchema(CreateCustomerDto))
  findAll(
    @Query() paginateParams: IPagination,
  ): GenericResponse<Observable<IPage<CustomerResponseDto>>> {
    return {
      message: 'Customers returned successfully',
      result: this.customerService.findAll(paginateParams),
    };
  }
}
