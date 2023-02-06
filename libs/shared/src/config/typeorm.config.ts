import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { isRunningInDevelopment } from '../utils/env.util';

const connection = {
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || ''),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};
const typeOrmConfig: TypeOrmModuleOptions = {
  ...connection,
  type: 'postgres',
  synchronize: isRunningInDevelopment(),
  dropSchema: isRunningInDevelopment(),
  keepConnectionAlive: false,
  logging: isRunningInDevelopment(),
  entities: [__dirname + '/../**/*.entity.ts'],
  autoLoadEntities: true,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: !isRunningInDevelopment(),
};

export default typeOrmConfig;
