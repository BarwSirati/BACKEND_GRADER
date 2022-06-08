import { Model } from 'mongoose';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User, UserDoc } from './entities/user.entity';
import * as Bcrypt from 'bcryptjs';
import { QuestionService } from 'src/question/question.service';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDoc>,
    private questionService: QuestionService,
  ) {}

  async create(createUser: CreateUserDto): Promise<User> {
    try {
      const query = await this.userModel.create(createUser);
      return query.save();
    } catch (err) {}
  }

  async findAll(): Promise<User[]> {
    return await this.userModel
      .find()
      .select('-_id -password -username')
      .exec();
  }

  async getPassword(username: string) {
    return await this.userModel
      .findOne({ username: username })
      .select('password')
      .exec();
  }
  async findOne(id: string): Promise<object> {
    try {
      const query: object = { _id: id };
      if (query) {
        const fetch = await this.userModel
          .findById(query)
          .select('-_id -password')
          .exec();
        const user: GetUserDto = {
          name: fetch.name,
          username: fetch.username,
          score: fetch.score,
          group: fetch.group,
          finished: fetch.finished,
          rank: 0,
          progress: 0,
        };
        return user;
      }
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async getScore(id: string): Promise<any> {
    const query: object = { _id: id };
    return await this.userModel.findOne(query).select('score -_id').exec();
  }

  async getFinish(id: string): Promise<any> {
    const query: object = { _id: id };
    return await this.userModel.findOne(query).select('finished -_id').exec();
  }

  async getProgress(id: string): Promise<number> {
    const countQuestion = this.questionService.getQty(id);
    const countPass = 0;
    return countQuestion;
    // if (countQuestion === 0 && countPass === 0) {
    //   return Number(0).toFixed(2);
    // }
    // return ((Number(countPass) * 100) / Number(countQuestion)).toFixed(2);
  }

  async updateScore(id: string, score: number) {
    try {
      if (await this.findOne(id)) {
        const query: object = { _id: id };
        const queryFinished = await this.getFinish(id);
        const finished = queryFinished.finished + 1;
        return await this.userModel.updateMany(query, {
          score: score,
          finished: finished,
        });
      }
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (await this.findOne(id)) {
        const query: object = { _id: id };
        if (updateUserDto.password) {
          const salt = Bcrypt.genSaltSync(12);
          updateUserDto.password = Bcrypt.hashSync(
            updateUserDto.password,
            salt,
          );
        }
        return await this.userModel
          .findByIdAndUpdate(query, updateUserDto)
          .exec();
      }
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    const query: object = { _id: id };
    return await this.userModel.findByIdAndRemove(query).exec();
  }
}
