import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { GroupRole } from 'src/common/groupRole.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Reusable function to create `accessToken`
  private createAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('EXPIRESIN_ACCESS_TOKEN'),
    });
  }

  // Register user
  async registerUser(
    email: string,
    password: string,
    name: string,
  ): Promise<any> {
    try {
      const existingUser = await this.userRepository.findOneBy({ email });
      if (existingUser) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User already registered',
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
        email,
        name,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'User registered successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Login and validate
  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['group', 'group.groupRoles', 'group.groupRoles.role'],
      });

      if (!user) {
        return false;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return false;
      }

      const userRole = user.group.groupRoles.map((groupRole) => ({
        name: groupRole.role.role,
        permissions: groupRole.role.permissions,
      }));

      const payload = { userId: user.id, email: user.email, role: userRole };
      const accessToken = this.createAccessToken(payload); // Using the reusable function

      const refreshToken = this.jwtService.sign(
        { userId: user.id },
        {
          expiresIn: this.configService.get<string>('EXPIRESIN_REFRESH_TOKEN'),
        },
      );

      return {
        accessToken,
        refreshToken,
        userProfile: {
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Function to refresh `accessToken` using `refreshToken`
  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const userId = decoded.userId;

      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['group', 'group.groupRoles', 'group.groupRoles.role'],
      });

      if (!user) {
        throw new HttpException(
          'Refresh token is invalid or expired',
          HttpStatus.UNAUTHORIZED,
        );
      }

      // Reusing the `userRole` structure
      const userRole = user.group.groupRoles.map((groupRole) => ({
        name: groupRole.role.role,
        permissions: groupRole.role.permissions,
      }));

      const payload = { userId: user.id, email: user.email, role: userRole };
      const accessToken = this.createAccessToken(payload); // Using reusable function

      return {
        accessToken,
        refreshToken,
        userProfile: {
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Refresh token is invalid or expired',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
