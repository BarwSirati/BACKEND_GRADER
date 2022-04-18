import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDoc } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel
      .find()
      .select('-_id -password -username')
      .exec();
  }

  async findOne(id: string): Promise<User[]> {
    const query: any = { _id: id };
    return await this.userModel.find(query).select('-_id -password').exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (await this.findOne(id)) {
        const query: any = { _id: id };
        return await this.userModel
          .findByIdAndUpdate(query, updateUserDto)
          .exec();
      }
    } catch (err) {}
  }

  async remove(id: string) {
    const query: any = { _id: id };
    return await this.userModel.findByIdAndRemove(query).exec();
  }
}
