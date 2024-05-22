import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
    // .expect(expect.any(Array));
  });
  it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ name: 'John Doe', email: 'abc@gmail.com', password: 'password' })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(201);
    // .expect({ id: expect.any(Number), name: 'John Doe' });
  });
  it('/user/:id (GET)', () => {
    return request(app.getHttpServer()).get('/user/1').expect(200);
    // .expect({ id: 1, name: expect.any(String) });
  });
});
