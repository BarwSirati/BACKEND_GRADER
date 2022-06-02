import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDoc } from 'src/users/entities/user.entity';
import { CreateLoginDto } from './dto/create-login.dto';
import { Model } from 'mongoose';
import * as Bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDoc>,
    private jwt: JwtService,
  ) {}
  async userLogin(createLoginDto: CreateLoginDto): Promise<JsonWebKey> {
    const user: any = await this.userModel
      .findOne({
        username: createLoginDto.username,
      })
      .exec();
    if (!user) throw new ForbiddenException();

    const compare = new Promise(async (resolve, reject) => {
      Bcrypt.compare(createLoginDto.password, user.password).then((res) => {
        if (res) {
          resolve(true);
        }
        resolve(false);
      });
    });
    if (!(await compare)) throw new ForbiddenException();
    return this.signToken(user._id, user.username);
  }

  async userRegister(createUser: CreateUserDto): Promise<User> {
    try {
      const salt = Bcrypt.genSaltSync(12);
      const hash = Bcrypt.hashSync(createUser.password, salt);
      createUser.password = hash;
      const createdUser = await this.userModel.create(createUser);
      return createdUser.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new HttpException('User Already Exists', HttpStatus.CONFLICT);
      }
    }
  }

  async signToken(userId: string, username: string): Promise<object> {
    const payload = {
      sub: userId,
      username: username,
    };
    const token = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: 60 * 60 * 24 * 7,
        secret: process.env.SECRET_KEY,
      }),
    ]);
    return {
      access_token: token,
    };
  }
}
