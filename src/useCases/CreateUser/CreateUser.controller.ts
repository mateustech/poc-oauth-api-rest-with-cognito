import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './CreateUser.dto';
import { CreateUserUseCase } from './CreateUserUseCase';

@Controller('client')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async handle(@Body() payload: CreateUserDto) {
    return await this.createUserUseCase.execute(payload);
  }
}
