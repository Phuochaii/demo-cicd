import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  getUsers(): Promise<any> {
    return this.appService.getUsers();
  }
  @Get('/user/:id')
  getUserById(id: number): Promise<any> {
    return this.appService.getUserById(id);
  }
  @Post('/user')
  createUser(@Body() user: any): Promise<any> {
    return this.appService.createUser(user);
  }
}
