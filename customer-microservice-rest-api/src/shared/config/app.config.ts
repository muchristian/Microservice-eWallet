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

/**
 * Configures and binds Swagger with the project's application
 * @param app The NestJS Application instance
 */
export function configureSwagger(app: INestApplication): void {
  const API_TITLE = 'Tekana-eWallet Apis';
  const API_DESCRIPTION = 'API Doc. for Tekana-eWallet';
  const API_VERSION = '1.0';
  const SWAGGER_URL = 'docs/swagger-ui';
  const options = new DocumentBuilder()
    .setTitle(API_TITLE)
    .setDescription(API_DESCRIPTION)
    .setVersion(API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_URL, app, document, {
    customSiteTitle: 'Tekana-eWallet',
    swaggerOptions: { docExpansion: 'none', persistAuthorization: true },
  });
}
