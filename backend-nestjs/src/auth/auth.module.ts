import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../common/user.entity';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard'; // Guard xác thực JWT
import { RoleGuard } from './role.guard'; // Guard kiểm tra vai trò
import { JwtStrategy } from './jwt.strategy'; // Chiến lược JWT

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard, RoleGuard], // Thêm các Guard vào Providers
  controllers: [AuthController], // Controller cho xác thực
  exports: [JwtAuthGuard, RoleGuard], // Xuất khẩu các Guard để sử dụng trong các Controller khác
})
export class AuthModule {}
