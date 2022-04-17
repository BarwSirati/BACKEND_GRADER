import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() createLogin: CreateLoginDto) {
    return await this.authService.login(createLogin);
  }
  @Post('register')
  async register(@Body() createUser: CreateUserDto) {
    return await this.authService.register(createUser);
  }
}
