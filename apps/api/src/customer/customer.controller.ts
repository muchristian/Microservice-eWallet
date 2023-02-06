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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { getGenericResponseSchema } from '@app/shared/utils/swagger.util';
import { ClientProxy } from '@nestjs/microservices';
import { checkIsEmail, checkIsPhone } from '@app/shared/utils/credential-check';
import { CreateCustomerDto } from '@app/shared/dto/create-customer.dto';

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

  @Get()
  @ApiOkResponse(getGenericResponseSchema(CreateCustomerDto))
  findMany() {
    return this.client.send({ cmd: 'get-customers' }, {});
  }
}
