import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // read
  async findAll(): Promise<{
    statusCode: number;
    users: User[];
    message: string;
  }> {
    try {
      const users = await this.userRepository.find();
      console.log('check data', users);

      if (users.length === 0) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND);
      }

      return {
        statusCode: HttpStatus.OK,
        users,
        message: 'Successfully retrieved users.',
      };
    } catch (error) {
      console.error('Find All Users Error:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // read with id
  async findOneById(
    id: number,
  ): Promise<{ statusCode: number; user: User; message: string }> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException('No user found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        user,
        message: 'Successfully retrieved user.',
      };
    } catch (error) {
      console.error('Find One User Error:', error);
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
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const result = await this.userRepository.update(id, updateData);
      if (result.affected === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully.',
      };
    } catch (error) {
      console.error('Update User Error:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // create
  async createUser(
    userData: Partial<User>,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const newUser = this.userRepository.create(userData);
      await this.userRepository.save(newUser);
      return {
        statusCode: HttpStatus.OK,
        message: 'User created successfully.',
      };
    } catch (error) {
      console.error('Create User Error:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // delete user
  async deleteUser(
    id: number,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully.',
      };
    } catch (error) {
      console.error('Delete User Error:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
