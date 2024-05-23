import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';
import { CreateUserDto } from 'src/DTO/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const mockAppService = {
    getUsers: () => [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ],
    getUserById: (id: number) => {
      return {
        id: Number(id),
        name: 'John Doe',
        email: 'abc@gmail.com',
        password: 'password',
      };
    },
    createUser: (user: any) => ({
      id: 3,
      ...user,
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(mockAppService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('get all user', () => {
    it('/users (GET) should return with status 200', () => {
      return request(app.getHttpServer()).get('/users').expect(200);
      // .expect(mockAppService.getUsers());
    });
    it('/users (GET) should return with correct value', () => {
      return (
        request(app.getHttpServer())
          .get('/users')
          //.expect(200)
          .expect(mockAppService.getUsers())
      );
    });
  });
  describe('create user', () => {
    it('/user (POST) should return with status 201', () => {
      const user: CreateUserDto = {
        name: 'John Doe',
        email: 'abc@gmail.com',
        password: 'password',
      };
      return request(app.getHttpServer()).post('/user').send(user).expect(201);
    });
    it('/user (POST) should return user with the same value with the input', () => {
      const user: CreateUserDto = {
        name: 'John Doe',
        email: 'abc@gmail.com',
        password: 'password',
      };
      return request(app.getHttpServer())
        .post('/user')
        .send(user)
        .expect(mockAppService.createUser(user));
    });
  });
  describe('get user by id', () => {
    it('/user/:id (GET) should return with status 200', () => {
      return request(app.getHttpServer()).get('/user/1').expect(200);
    });
    it('/user/:id (GET) should return with the same id', () => {
      return request(app.getHttpServer())
        .get('/user/1')
        .expect(mockAppService.getUserById(1));
    });
  });
});
