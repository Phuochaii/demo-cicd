import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
}
