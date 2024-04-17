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
import { Result } from 'src/common/result.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // register
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
  ): Promise<any> {
    if (password.trim() !== confirmPassword.trim()) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    const data = await this.authService.registerUser(email, password);
    return new Result(data.EC, data.DT, data.EM);
  }
  // login
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    try {
      return req.user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Login failed',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
