import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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
    }
  }

  // Login and validate
  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        return false;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return false;
      }

      const payload = { userId: user.id, email: user.email }; // roles: user.roles
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('EXPIRESIN_ACCESS_TOKEN'),
      });
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
    }
  }
}
