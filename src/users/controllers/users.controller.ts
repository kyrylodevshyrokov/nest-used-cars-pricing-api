import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';

import { UserDto } from '../dto/user.dto';
import { AuthService } from '../services/auth.service';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../entities/user.entity';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;

    return user;
  }

  @Post('signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getUserProfile(@CurrentUser() user: User) {
    return user;
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('user was not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
