import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtGuard } from './guard/jwt.guard';

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

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    return await this.authService.logout(res);
  }
}
