import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import GenericResponse from '../shared/interfaces/generic-response';
import { IPage } from 'src/shared/interfaces/page.interface';
import { IPagination } from './dto/paginate.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Customer } from './entities/customer.entity';
import { getGenericResponseSchema } from 'src/shared/utils/swagger.util';
import { checkIsEmail, checkIsPhone } from 'src/shared/utils/credential-check';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiCreatedResponse(getGenericResponseSchema(CreateCustomerDto))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    if (!checkIsEmail(createCustomerDto.email)) {
      throw new BadRequestException('Invalid email');
    }
    if (!checkIsPhone(createCustomerDto.phone)) {
      throw new BadRequestException('Invalid phone');
    }
    return await this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiOkResponse(getGenericResponseSchema(CreateCustomerDto))
  async findOne() {
    // : GenericResponse<Observable<IPage<CustomerResponseDto>>>
    return await this.customerService.findOne();
  }
}
