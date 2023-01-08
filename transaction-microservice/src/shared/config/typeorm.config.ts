import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { isRunningInDevelopment } from '../utils/env.util';

const connection =
  process.env.NODE_ENV === 'development'
    ? {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT || ''),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      }
    : {
        url: process.env.DATABASE_URL,
      };
const typeOrmConfig: TypeOrmModuleOptions = {
  ...connection,
  type: 'postgres',
  synchronize: isRunningInDevelopment(),
  dropSchema: isRunningInDevelopment(),
  keepConnectionAlive: true,
  logging: isRunningInDevelopment(),
  entities: ['dist/**/*.entity.js'],
  autoLoadEntities: false,
  migrationsTableName: 'migrations',
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsRun: !isRunningInDevelopment(),
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

export default typeOrmConfig;
