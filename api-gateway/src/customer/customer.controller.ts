import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { IPagination } from './dto/paginate.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  getGenericResponseSchema,
  getPaginatedSchema,
} from '../shared/utils/swagger.util';
import { ClientProxy } from '@nestjs/microservices';
import { checkIsEmail, checkIsPhone } from 'src/shared/utils/credential-check';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(
    @Inject('CUSTOMER_SERVICE') private readonly client: ClientProxy,
  ) {}

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
    return this.client.send({ cmd: 'create-customer' }, createCustomerDto);
  }

  @Get(':id')
  @ApiOkResponse(getGenericResponseSchema(CreateCustomerDto))
  @ApiParam({ name: 'id' })
  findOne(
    @Param('id') id: string, // : GenericResponse<Observable<IPage<CustomerResponseDto>>>
  ) {
    return this.client.send({ cmd: 'get-customer' }, id);
  }
}
