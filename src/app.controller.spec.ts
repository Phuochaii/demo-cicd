import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const mockAppService = {
    getHello: jest.fn(() => 'Hello World!'),
    getUsers: jest.fn(() => [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Date Bob' },
    ]),
    getUserById: jest.fn((id: number) => ({ id: id, name: 'John Doe' })),
    createUser: jest.fn((user: any) => ({
      id: Math.floor(Math.random() * 100),
      ...user,
    })),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      .overrideProvider(AppService)
      .useValue(mockAppService)
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('get all users', () => {
    it('should return an array of users', async () => {
      expect(await appController.getUsers()).toEqual(expect.any(Array));
    });
  });

  describe('get user by id', () => {
    it('should return a user by id', async () => {
      expect(await appController.getUserById(1)).toEqual({
        id: 1,
        name: expect.any(String),
      });
    });
  });

  describe('create user', () => {
    it('should create a user', async () => {
      expect(
        await appController.createUser({
          name: 'John Doe',
          email: 'email@gmail.com',
          password: 'password',
        }),
      ).toEqual({
        id: expect.any(Number),
        name: 'John Doe',
        email: 'email@gmail.com',
        password: 'password',
      });
    });
  });
});
