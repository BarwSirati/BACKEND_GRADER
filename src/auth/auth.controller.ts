import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/user/login')
  async userLogin(@Body() createLogin: CreateLoginDto) {
    return await this.authService.userLogin(createLogin);
  }

  @UseGuards(JwtGuard)
  @Post('/user/register')
  async userRegister(@Body() createUser: CreateUserDto) {
    return await this.authService.userRegister(createUser);
  }
}
