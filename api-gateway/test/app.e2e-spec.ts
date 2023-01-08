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

  it('should create a movie', async () => {
    const res = await request(app.getHttpServer())
      .post(`/movie`)
      .send({ title: 'The Lion' });
    id = JSON.parse(res.text).result.id;
    expect(res.status).toEqual(HttpStatus.CREATED);
  });

  it('should get movies', async () => {
    const res = await request(app.getHttpServer()).get(
      `/movie?page=1&limit=10`,
    );
    expect(res.status).toEqual(HttpStatus.OK);
  });

  it('should update a movie', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/movie/${id}`)
      .send({ title: 'The Lions gate' });
    expect(res.status).toEqual(HttpStatus.OK);
  });

  it('should rank a movie', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/movie/${id}/rank`)
      .send({ rank: 5 });
    expect(res.status).toEqual(HttpStatus.OK);
  });

  it('should delete a movie', async () => {
    const res = await request(app.getHttpServer()).delete(`/movie/${id}`);
    expect(res.status).toEqual(HttpStatus.OK);
  });
});
