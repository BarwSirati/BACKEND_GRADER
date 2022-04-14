import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDoc } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User[]> {
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    return await this.userModel.find(query).exec();
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (await this.findOne(id)) {
        const query: any = { _id: new mongoose.Types.ObjectId(id) };
        return await this.userModel
          .findByIdAndUpdate(query, updateUserDto)
          .exec();
      }
    } catch (err) {}
  }

  async remove(id: string) {
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    return await this.userModel.findByIdAndRemove(query).exec();
  }
}
