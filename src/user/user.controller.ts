import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getBydId(Number(id));
  }

  @Post()
  @Public()
  createUser(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.userService.update(Number(id), payload);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(Number(id));
  }
}
