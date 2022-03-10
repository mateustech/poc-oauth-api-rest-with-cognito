import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Config } from './config/config';
import { AuthenticateModule } from './useCases/AuthenticateUser/AuthenticateUser.module';
import { CreateUserModule } from './useCases/CreateUser/CreateUser.module';

@Module({
  imports: [
    CreateUserModule,
    AuthenticateModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [Config],
})
export class AppModule {}
