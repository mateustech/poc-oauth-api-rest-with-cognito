import { Module } from '@nestjs/common';
import { CognitoService } from 'src/services/cognito/cognito.service';
import { Config } from '../../config/config';
import { AuthenticateController } from './AuthenticateUser.controller';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

@Module({
  imports: [],
  controllers: [AuthenticateController],
  providers: [AuthenticateUserUseCase, CognitoService, Config],
})
export class AuthenticateModule {}
