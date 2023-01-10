import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { initializeTestApp } from './utils';
import { getConnection } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let id: number;

  beforeAll(async () => {
    app = await initializeTestApp();
    await app.init();
  });

  afterAll(async () => {
    await getConnection().close();
    await app.close();
  });
});
