import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Result } from 'src/common/result.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //   register
  async registerUser(email: string, password: string): Promise<Result<User>> {
    try {
      const existingUser = await this.userRepository.findOneBy({ email });

      if (existingUser) {
        return new Result(-1, null, 'User already registered');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userRepository.create({
        email,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);

      return new Result(0, null, 'Register success!');
    } catch (error) {
      console.log(error);
    }
  }
  // login
  async validateUser(
    email: string,
    password: string,
  ): Promise<Result<User | null>> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        return new Result(-1, null, 'Email no exits!');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return new Result(-1, null, 'Invalid password!');
      }
      return new Result(0, user, 'Login success!');
    } catch (error) {
      console.error(error);
    }
  }
}
