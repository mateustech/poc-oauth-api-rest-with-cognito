import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { CreateUserDto } from './../../useCases/CreateUser/CreateUser.dto';

export interface ICognitoService {
  cognito: AWS.CognitoIdentityServiceProvider;

  createUser(
    payload: CreateUserDto,
  ): Promise<CognitoIdentityServiceProvider.AdminCreateUserResponse>;

  definePassword(
    username: string,
    password: string,
  ): Promise<CognitoIdentityServiceProvider.AdminSetUserPasswordResponse>;

  deleteUser(username): Promise<Record<string, never> | null>;

  getUserByUsername(
    username,
  ): Promise<CognitoIdentityServiceProvider.AdminGetUserResponse>;

  authUser(
    username: string,
    password: string,
  ): Promise<CognitoIdentityServiceProvider.AdminInitiateAuthResponse>;
}
