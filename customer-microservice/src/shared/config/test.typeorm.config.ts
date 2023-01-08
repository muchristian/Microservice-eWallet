import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

const testingTypeOrmConfig: TypeOrmModuleOptions = {
  host: process.env.TEST_DB_HOST,
  port: 5432,
  username: process.env.TEST_DB_USER,
  password: process.env.TEST_DB_PASSWORD,
  database: process.env.TEST_DB_NAME,
  type: 'postgres',
  entities: [
    __dirname + '/../**/*.entity.js',
    __dirname + '/../**/*.entity.ts',
  ],
  dropSchema: true,
  synchronize: true,
  logging: false,
  autoLoadEntities: true,
};

export default testingTypeOrmConfig;
