import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Register user
  async registerUser(
    email: string,
    password: string,
    name: string,
    confirmPassword: string,
  ): Promise<any> {
    try {
      const existingUser = await this.userRepository.findOneBy({ email });
      if (existingUser) {
        throw new HttpException(
          'User already registered',
          HttpStatus.BAD_REQUEST,
        );
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
      console.error('Registration Error:', error);
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Login and validate user
  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new HttpException('Email does not exist', HttpStatus.BAD_REQUEST);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      }

      const payload = { userId: user.id, email: user.email }; // roles: user.roles
      const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
      const refreshToken = this.jwtService.sign(
        { userId: user.id },
        { expiresIn: '7d' },
      );

      const token = this.jwtService.sign(payload);

      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        accessToken,
        refreshToken,
        user: {
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      console.error('Validation Error:', error);
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
