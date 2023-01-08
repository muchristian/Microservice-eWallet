import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface AppConfig {
  port: number;
  env: string;
  url: string;
  database?: TypeOrmModuleOptions;
  allowedOrigins?: string[];
  swaggerEnabled: boolean;
}
export default AppConfig;
