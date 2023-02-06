import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

class BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  @ApiProperty()
  deletedAt?: Date;
}

export default BaseEntity;
