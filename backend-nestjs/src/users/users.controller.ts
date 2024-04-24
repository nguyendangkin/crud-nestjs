import {
  Controller,
  Get,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Post,
  Delete,
  UseGuards, // Sử dụng UseGuards để áp dụng Guards
  SetMetadata, // Để chỉ định vai trò yêu cầu
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../common/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Guard xác thực JWT
import { RoleGuard } from '../auth/role.guard'; // Guard kiểm tra vai trò

@UseGuards(JwtAuthGuard) // Áp dụng JwtAuthGuard để xác thực JWT
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Read all users
  @SetMetadata('roles', ['admin', 'editor']) // Chỉ cho phép vai trò 'admin'
  @UseGuards(JwtAuthGuard, RoleGuard) // Áp dụng JwtAuthGuard và RoleGuard
  @Get()
  async findAll() {
    try {
      const result = await this.userService.findAll();
      return {
        statusCode: HttpStatus.OK,
        data: result.users,
        message: result.message,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Create new user
  @Post()
  async createNewUser(@Body() userData: Partial<User>) {
    try {
      console.log('checking user', userData);

      const result = await this.userService.createUser(userData);
      return {
        statusCode: result.statusCode,
        message: result.message,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Read one user by ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const result = await this.userService.findOneById(id);
      return {
        statusCode: HttpStatus.OK,
        user: result.user,
        message: result.message,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'No user found',
        error.statusCode || HttpStatus.NOT_FOUND,
      );
    }
  }

  // Update user
  @SetMetadata('roles', ['admin', 'editor']) // Cho phép các vai trò 'admin' hoặc 'editor'
  @SetMetadata('permissions', ['edit']) // Yêu cầu quyền 'edit'
  @UseGuards(JwtAuthGuard, RoleGuard) // Áp dụng JwtAuthGuard và RoleGuard
  @Post()
  async updateUserById(@Body() updateData: Partial<User>) {
    try {
      const id = updateData.id;
      const result = await this.userService.updateUserById(id, updateData);
      return {
        statusCode: result.statusCode,
        message: result.message,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'User not found',
        error.statusCode || HttpStatus.NOT_FOUND,
      );
    }
  }

  // Delete user
  @Delete(':id') // Định nghĩa endpoint xóa theo ID
  async deleteTheUser(@Param('id') id: number) {
    try {
      const result = await this.userService.deleteUser(id); // Sử dụng ID để xóa
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully.',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'User not found',
        error.statusCode || HttpStatus.NOT_FOUND,
      );
    }
  }
}
