import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Nếu không yêu cầu vai trò cụ thể
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Lấy người dùng từ JWT

    return roles.some((role) => user.role.name === role); // Kiểm tra quyền truy cập
  }
}
