import { configureSwagger } from '@app/shared/config/app.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const env = configService.get('env');

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  if (['development'].includes(env)) {
    configureSwagger(app);
  }
  await app.listen(port || 3000);
  Logger.log(`port listening to ${port}`);
}
bootstrap();
