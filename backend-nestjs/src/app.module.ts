import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true, 
  }), UsersModule,],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
