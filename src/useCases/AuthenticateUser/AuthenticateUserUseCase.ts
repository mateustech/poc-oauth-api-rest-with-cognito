import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CognitoService } from 'src/services/cognito/cognito.service';
import { AuthenticateDto } from './AuthenticateUser.dto';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private cognitoService: CognitoService) {
    //
  }

  async execute(payload: AuthenticateDto) {
    const token = await this.cognitoService.authUser(
      payload.email,
      payload.password,
    );

    if (!token) {
      throw new InternalServerErrorException('Error authenticate user');
    }

    return token;
  }
}
