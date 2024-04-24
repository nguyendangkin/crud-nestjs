import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    ); // Lấy quyền hạn yêu cầu

    if (!requiredRoles && !requiredPermissions) {
      return true; // Nếu không yêu cầu vai trò hoặc quyền hạn cụ thể
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Kiểm tra xem người dùng có vai trò cần thiết không
    const hasRole = requiredRoles
      ? user.role.some((r) => requiredRoles.includes(r.name))
      : true;

    // Kiểm tra xem người dùng có quyền hạn cần thiết không
    const hasPermission = requiredPermissions
      ? user.role.some((r) =>
          r.permissions.some((p) => requiredPermissions.includes(p)),
        )
      : true;

    return hasRole && hasPermission; // Yêu cầu cả vai trò và quyền hạn
  }
}
