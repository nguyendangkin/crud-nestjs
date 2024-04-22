import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // CanActivate xác thực JWT
  canActivate(context: ExecutionContext) {
    return super.canActivate(context); // Xác thực JWT
  }

  // HandleRequest kiểm tra JWT
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException(); // Nếu xác thực thất bại
    }
    return user; // Nếu thành công, trả về người dùng
  }
}
