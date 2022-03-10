import { Injectable } from '@nestjs/common';
import { checkConfig } from './healpers/checkConfig';

@Injectable()
export class Config {
  aws: {
    AWS_USER_ACCESS_KEY: string;
    AWS_USER_SECRET_KEY: string;
    AWS_USER_REGION: string;
  };
  cognito: {
    COGNITO_USER_POOL_ID: string;
    COGNITO_WEB_CLIENT_ID: string;
    COGNITO_REGION: string;
    AUTHORITY: string;
  };

  constructor() {
    this.aws = {
      AWS_USER_ACCESS_KEY: process.env.AWS_USER_ACCESS_KEY,
      AWS_USER_SECRET_KEY: process.env.AWS_USER_SECRET_KEY,
      AWS_USER_REGION: process.env.AWS_USER_REGION || 'us-east-1',
    };
    this.cognito = {
      COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
      COGNITO_WEB_CLIENT_ID: process.env.COGNITO_WEB_CLIENT_ID,
      COGNITO_REGION: process.env.COGNITO_REGION || 'us-east-1',
      AUTHORITY: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
    };
    checkConfig({
      ...this.aws,
      ...this.cognito,
    });
  }
}
