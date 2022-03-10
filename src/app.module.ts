import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Config } from './config/config';
import { CreateUserModule } from './useCases/CreateUser/CreateUser.module';

@Module({
  imports: [
    CreateUserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [Config],
})
export class AppModule {}
