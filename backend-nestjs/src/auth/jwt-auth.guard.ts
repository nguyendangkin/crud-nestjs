import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      console.error('JWT Error:', err, info); // Debug lỗi JWT
      throw err || new UnauthorizedException('JWT is invalid or missing');
    }
    return user;
  }
}
