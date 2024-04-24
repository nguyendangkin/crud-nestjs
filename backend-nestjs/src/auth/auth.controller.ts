import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Res,
  HttpException,
  Req,
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

  // Đăng ký
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
      throw new HttpException(
        'Error registering user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Đăng nhập
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

    // Thiết lập cookie `refreshToken`
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

  // Làm mới `accessToken`
  @Post('refresh-token')
  async refreshAccessToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const cookies = req.headers['cookie']; // Lấy chuỗi cookie từ header
      const cookiesArray = cookies.split('; '); // Phân tách chuỗi cookie thành một mảng
      const refreshTokenCookie = cookiesArray.find((cookie) =>
        cookie.startsWith('refreshToken='),
      );
      const refreshToken = refreshTokenCookie.split('=')[1]; // Lấy giá trị của 'refreshToken'

      const newAccessToken =
        await this.authService.refreshAccessToken(refreshToken);

      return {
        statusCode: HttpStatus.OK,
        message: 'Access token refreshed',
        accessToken: newAccessToken,
      };
    } catch (error) {
      throw new HttpException(
        'Refresh token is invalid or expired. Please log in again.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // Đăng xuất
  @Post('/logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ statusCode: number; message: string }> {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0), // Cookie hết hạn ngay lập tức
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Logout successful',
    };
  }
}
