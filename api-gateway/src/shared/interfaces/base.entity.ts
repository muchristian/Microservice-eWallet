import { ApiProperty } from '@nestjs/swagger';

class BaseEntity {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  createdAt?: Date;
}

export default BaseEntity;
