import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Result } from 'src/common/result.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // read
  async findAll(): Promise<Result<User[]>> {
    try {
      const data = await this.userRepository.find();

      if (data.length === 0) {
        return new Result(-1, null, 'No users found');
      }

      return new Result(0, data, 'successfully!');
    } catch (error) {
      console.error('Find All Users Error:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // read with id
  async findOneById(id: number): Promise<Result<User[]>> {
    try {
      const data = await this.userRepository.findOneBy({ id });

      if (!data) {
        return new Result(-1, null, 'No users found');
      }
      return new Result(0, [data], 'successfully!');
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // update
  async updateUserById(
    id: number,
    updateData: Partial<User>,
  ): Promise<Result<void>> {
    try {
      const data = await this.userRepository.update(id, updateData);

      if (data.affected === 0) {
        return new Result(-1, null, 'User not found');
      }
      return new Result(0, null, 'Update successful');
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // create
  async createUser(userData: Partial<User>): Promise<Result<void>> {
    try {
      const newUser = this.userRepository.create(userData);

      await this.userRepository.save(newUser);
      return new Result(0, null, 'User created successfully');
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // delete user
  async deleteUser(id: number): Promise<Result<void>> {
    try {
      const data = await this.userRepository.delete(id);
      if (data.affected === 0) {
        return new Result(-1, null, 'User not found');
      }

      console.log('check data:', data);
      return new Result(0, null, 'User deleted successfully');
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
