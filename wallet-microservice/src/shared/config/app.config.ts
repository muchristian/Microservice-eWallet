import { INestApplication, UnauthorizedException } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppConfig from '../interfaces/app-config.interface';
import testingTypeOrmConfig from './test.typeorm.config';
import typeOrmConfig from './typeorm.config';
import 'dotenv/config';

export const commonConfig = (): AppConfig => ({
  port: parseInt(process.env.PORT || ''),
  env: process.env.NODE_ENV || '',
  url: process.env.API_URL || '',
});

export const runtimeConfig = (): AppConfig => ({
  database:
    process.env.NODE_ENV === 'test' ? testingTypeOrmConfig : typeOrmConfig,
  ...commonConfig(),
});
