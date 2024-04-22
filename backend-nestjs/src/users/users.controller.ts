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
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Guard để xác thực JWT
import { RoleGuard } from '../auth/role.guard'; // Guard để kiểm tra vai trò

// @UseGuards(JwtAuthGuard) // Bảo vệ toàn bộ Controller bằng JwtAuthGuard
// @SetMetadata('roles', ['admin']) // Chỉ định vai trò 'admin'
// @UseGuards(RoleGuard) // Sử dụng RoleGuard để kiểm tra vai trò
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Read all users
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
  @Delete(':id')
  async deleteTheUser(@Param('id') id: number) {
    try {
      const result = await this.userService.deleteUser(id);
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
}
