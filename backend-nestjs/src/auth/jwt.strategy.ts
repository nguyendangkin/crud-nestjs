import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy JWT từ Authorization header
      ignoreExpiration: false, // Không bỏ qua thời hạn của JWT
      secretOrKey: configService.get<string>('JWT_SECRET'), // Bí mật JWT
    });
  }

  // Hàm validate được gọi khi JWT hợp lệ, trả về thông tin người dùng
  async validate(payload: any) {
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
  }
}
