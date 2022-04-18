import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try {
      const query: any = { _id: id };
      if (query) {
        return await this.userModel.find(query).select('-_id -password').exec();
      }
      return [];
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async getScore(id: string): Promise<any> {
    const query: any = { _id: id };
    return await this.userModel.findOne(query).select('score -_id').exec();
  }

  async getFinish(id: string): Promise<any> {
    const query: any = { _id: id };
    return await this.userModel.findOne(query).select('finished -_id').exec();
  }

  async updateScore(id: string, score: number) {
    try {
      if (await this.findOne(id)) {
        const query: any = { _id: id };
        const queryFinished = await this.getFinish(id);
        const finished = queryFinished.finished + 1;
        return await this.userModel.updateMany(query, {
          score: score,
          finished: finished,
        });
      }
    } catch (err) {
      console.log(err.code);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (await this.findOne(id)) {
        const query: any = { _id: id };
        return await this.userModel
          .findByIdAndUpdate(query, updateUserDto)
          .exec();
      }
    } catch (err) {
      console.log(err.code);
    }
  }

  async remove(id: string) {
    const query: any = { _id: id };
    return await this.userModel.findByIdAndRemove(query).exec();
  }
}
