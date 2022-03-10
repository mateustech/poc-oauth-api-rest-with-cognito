import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { Config } from 'src/config/config';
import { CreateUserDto } from './../../useCases/CreateUser/CreateUser.dto';
import { ICognitoService } from './cognito.interface';

@Injectable()
export class CognitoService implements ICognitoService {
  cognito: AWS.CognitoIdentityServiceProvider;

  constructor(private readonly config: Config) {
    AWS.config.update({
      region: config.aws.AWS_USER_REGION,
      accessKeyId: config.aws.AWS_USER_ACCESS_KEY || undefined,
      secretAccessKey: config.aws.AWS_USER_SECRET_KEY || undefined,
    });
    this.cognito = new AWS.CognitoIdentityServiceProvider();
  }

  async createUser(
    payload: CreateUserDto,
  ): Promise<CognitoIdentityServiceProvider.AdminCreateUserResponse> {
    const params: CognitoIdentityServiceProvider.AdminCreateUserRequest = {
      UserPoolId: this.config.cognito.COGNITO_USER_POOL_ID,
      Username: payload.email,
      MessageAction: 'SUPPRESS',
      UserAttributes: this.getUserAttributes(payload),
    };

    return new Promise((resolve, reject) => {
      this.cognito.adminCreateUser(params, (err, data) => {
        if (err) {
          //   log.info('Error insert cognito', { error: err.toString() });
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async definePassword(
    username: string,
    password: string,
  ): Promise<CognitoIdentityServiceProvider.AdminSetUserPasswordResponse> {
    const params: CognitoIdentityServiceProvider.AdminSetUserPasswordRequest = {
      UserPoolId: this.config.cognito.COGNITO_USER_POOL_ID,
      Username: username,
      Password: password,
      Permanent: true,
    };

    return new Promise((resolve, reject) => {
      this.cognito.adminSetUserPassword(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async getUserByUsername(
    username: string,
  ): Promise<CognitoIdentityServiceProvider.AdminGetUserResponse | null> {
    const params: CognitoIdentityServiceProvider.AdminGetUserRequest = {
      UserPoolId: this.config.cognito.COGNITO_USER_POOL_ID,
      Username: username,
    };

    return new Promise((resolve, reject) => {
      this.cognito.adminGetUser(params, (err, data) => {
        if (err) {
          if (err.code !== 'UserNotFoundException') {
            reject(err);
          } else {
            resolve(null);
          }
        } else {
          resolve(data);
        }
      });
    });
  }

  async deleteUser(username: string): Promise<Record<string, never> | null> {
    const params: CognitoIdentityServiceProvider.AdminDeleteUserRequest = {
      UserPoolId: this.config.cognito.COGNITO_USER_POOL_ID,
      Username: username,
    };

    return new Promise((resolve, reject) => {
      this.cognito.adminDeleteUser(params, (err, data) => {
        if (err) {
          if (err.code !== 'UserNotFoundException') {
            reject(err);
          } else {
            resolve(null);
          }
        } else {
          resolve(data);
        }
      });
    });
  }

  private getUserAttributes = (
    payload: CreateUserDto,
  ): CognitoIdentityServiceProvider.AttributeListType => {
    const attributeList: CognitoIdentityServiceProvider.AttributeListType = [];

    if (payload.email) {
      attributeList.push({
        Name: 'email',
        Value: payload.email,
      });
      attributeList.push({
        Name: 'email_verified',
        Value: 'true',
      });
    }

    return attributeList;
  };

  async authUser(
    username: string,
    password: string,
  ): Promise<CognitoIdentityServiceProvider.AdminInitiateAuthResponse> {
    const params: CognitoIdentityServiceProvider.AdminInitiateAuthRequest = {
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      ClientId: this.config.cognito.COGNITO_WEB_CLIENT_ID,
      UserPoolId: this.config.cognito.COGNITO_USER_POOL_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };

    return new Promise((resolve, reject) => {
      this.cognito.adminInitiateAuth(params, (err, data) => {
        if (err) {
          if (err.code !== 'UserNotFoundException') {
            reject(err);
          } else {
            resolve(null);
          }
        } else {
          resolve(data);
        }
      });
    });
  }
}
