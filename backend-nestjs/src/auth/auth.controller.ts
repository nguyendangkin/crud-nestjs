import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Register
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
    @Body('name') name: string,
  ): Promise<any> {
    try {
      const result = await this.authService.registerUser(
        email,
        password,
        name,
        confirmPassword,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: result.message,
      };
    } catch (error) {
      throw new HttpException(
        error.response || 'Registration failed',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Login
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    try {
      if (!req.user) {
        throw new HttpException(
          'User not authenticated',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        user: req.user,
      };
    } catch (error) {
      throw new HttpException(
        error.response || 'Login failed',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
