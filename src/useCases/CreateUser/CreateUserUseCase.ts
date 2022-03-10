import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CognitoService } from './../../services/cognito/cognito.service';
import { CreateUserDto } from './CreateUser.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private cognitoService: CognitoService) {}

  async execute(payload: CreateUserDto) {
    const clintExists = await this.cognitoService.getUserByUsername(
      payload.email,
    );

    if (clintExists) {
      throw new InternalServerErrorException('Client already exists');
    }

    const client = await this.cognitoService.createUser(payload);

    if (!client) {
      throw new InternalServerErrorException('Error create client on Cognito');
    }

    const passwordDefined = await this.cognitoService.definePassword(
      payload.email,
      payload.password,
    );

    if (!passwordDefined) {
      await this.cognitoService.deleteUser(payload.email);

      throw new InternalServerErrorException('Error defined password');
    }

    return { message: 'Client created successfully' };
  }
}
