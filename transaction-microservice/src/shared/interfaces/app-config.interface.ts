import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface AppConfig {
  port: number;
  env: string;
  url: string;
  database?: TypeOrmModuleOptions;
  allowedOrigins?: string[];
}
export default AppConfig;
