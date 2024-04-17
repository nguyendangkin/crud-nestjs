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
      console.log('check data:', data);

      if (data.EC == -1) {
        return new Result(data.EC, data.DT, data.EM);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // create
  @Post()
  async createNewUser(@Body() userData: Partial<User>): Promise<Result<void>> {
    try {
      const data = await this.userService.createUser(userData);
      if (data.EC === -1) {
        return new Result(data.EC, data.DT, data.EM);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // Read one user by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Result<User[]>> {
    try {
      const data = await this.userService.findOneById(id);
      if (!data) {
        return new Result(data.EC, data.DT, data.EM);
      }
      return data;
    } catch (error) {
      console.log(error);
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
      if (data.EC === -1) {
        return new Result(data.EC, data.DT, data.EM);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // delete user
  @Delete(':id')
  async deleteTheUser(@Param('id') id: number): Promise<Result<void>> {
    try {
      const data = await this.userService.deleteUser(id);
      if (data.EC === -1) {
        return new Result(data.EC, data.DT, data.EM);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
