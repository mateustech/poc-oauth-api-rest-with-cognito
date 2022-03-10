import { Module } from '@nestjs/common';
import { CognitoService } from 'src/services/cognito/cognito.service';
import { Config } from './../../config/config';
import { CreateUserController } from './CreateUser.controller';
import { CreateUserUseCase } from './CreateUserUseCase';

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase, CognitoService, Config],
})
export class CreateUserModule {}
