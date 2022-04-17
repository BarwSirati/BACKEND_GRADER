import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDoc } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
dotenv.config();
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { sub: string; username: string }) {
    const user: any = await this.userModel.findOne({ _id: payload.sub });
    return user;
  }
}
