import {
  Controller,
  Get,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Post,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Result } from 'src/common/result.model';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Read all users
  @Get()
  async findAll(): Promise<Result<User[]>> {
    try {
      const data = await this.userService.findAll();

      if (data.EC !== 0) {
        throw new HttpException(data.EM, HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Failed to retrieve users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // create
  @Post()
  async createNewUser(@Body() userData: Partial<User>): Promise<Result<void>> {
    try {
      const data = await this.userService.createUser(userData);
      if (data.EC !== 0) {
        throw new HttpException(data.EM, HttpStatus.NOT_FOUND);
      }

      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to retrieve users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Read one user by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Result<User[]>> {
    try {
      const data = await this.userService.findOneById(id);
      if (!data) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to retrieve user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update user
  @Post(':id')
  async updateUserById(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
  ): Promise<Result<void>> {
    try {
      const data = await this.userService.updateUserById(id, updateData);
      if (data.EC !== 0) {
        throw new HttpException(data.EM, HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to retrieve users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // delete user
  @Delete(':id')
  async deleteTheUser(@Param('id') id: number): Promise<Result<void>> {
    try {
      const data = await this.userService.deleteUser(id);
      if (data.EC !== 0) {
        throw new HttpException(data.EM, HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to retrieve users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
