import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  // Register
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
    @Body('name') name: string,
  ): Promise<any> {
    try {
      const result = await this.authService.registerUser(email, password, name);
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
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    if (!req.user || req.user.statusCode === 401) {
      return {
        statusCode: req.user.statusCode,
        message: req.user.message,
      };
    }

    const { refreshToken, accessToken, userProfile } = req.user;
    const daysToExpire = parseInt(
      this.configService.get<string>('EXPIRESIN_COOKIE_REFRESH_TOKEN'),
    );
    const expiresInMilliseconds = daysToExpire * 24 * 60 * 60 * 1000;
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(Date.now() + expiresInMilliseconds),
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      accessToken,
      userProfile,
    };
  }
}
