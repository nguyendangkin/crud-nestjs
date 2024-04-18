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
        statusCode: result.statusCode,
        message: result.message,
      };
    } catch (error) {
      console.log(error);
    }
  }

  // Login
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    if (!req.user || req.user.statusCode === 401) {
      return {
        statusCode: req.user.statusCode,
        message: req.user.message,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      user: req.user,
    };
  }
}
