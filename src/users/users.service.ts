import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDoc } from './entities/user.entity';
import * as Bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = Bcrypt.genSaltSync(12);
      const hash = Bcrypt.hashSync(createUserDto.password, salt);
      createUserDto.password = hash;
      const createdUser = await this.userModel.create(createUserDto);
      return createdUser.save();
    } catch (err) {
      throw new HttpException('Username Already Exists', HttpStatus.CONFLICT);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-_id -password').exec();
  }

  async findOne(username: string): Promise<User[]> {
    const query: any = { username: username };
    return await this.userModel.find(query).select('-_id -password').exec();
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    try {
      if (await this.findOne(username)) {
        const query: any = { username: username };
        return await this.userModel
          .findByIdAndUpdate(query, updateUserDto)
          .exec();
      }
    } catch (err) {}
  }

  async remove(username: string) {
    const query: any = { username: username };
    return await this.userModel.findByIdAndRemove(query).exec();
  }
}
