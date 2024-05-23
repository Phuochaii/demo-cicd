import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserDto } from './DTO/create-user.dto';

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
    it('should call the service.getUsers method', async () => {
      expect(mockAppService.getUsers).toHaveBeenCalled();
    });
    it('should call the service.createUser method with the correct value', async () => {
      expect(mockAppService.getUsers).toHaveBeenCalledWith();
    });
  });

  describe('get user by id', () => {
    const id = 1;
    it('should return a user by id', async () => {
      expect(await appController.getUserById(id)).toEqual({
        id: id,
        name: expect.any(String),
      });
    });
    it('should call the service.getUserById method', async () => {
      expect(mockAppService.getUserById).toHaveBeenCalled();
    });
    it('should call the service.createUser method with the correct value', async () => {
      expect(mockAppService.getUserById).toHaveBeenCalledWith(id);
    });
  });

  describe('create user', () => {
    const user: CreateUserDto = {
      name: 'John Doe',
      email: 'email@gmail.com',
      password: 'password',
    };
    it('should create a user', async () => {
      expect(await appController.createUser(user)).toEqual({
        id: expect.any(Number),
        ...user,
      });
    });
    it('should call the service.createUser method', async () => {
      expect(mockAppService.createUser).toHaveBeenCalled();
    });
    it('should call the service.createUser method with the correct value', async () => {
      expect(mockAppService.createUser).toHaveBeenCalledWith(user);
    });
  });
});
