import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateDto } from './AuthenticateUser.dto';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

@Controller('oauth')
export class AuthenticateController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post('token')
  async handle(@Body() payload: AuthenticateDto) {
    return await this.authenticateUserUseCase.execute(payload);
  }
}
