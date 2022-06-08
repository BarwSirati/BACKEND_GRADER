import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User, UserDoc } from './entities/user.entity';
import * as Bcrypt from 'bcryptjs';
import { QuestionService } from 'src/question/question.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Submit, SubmitDoc } from 'src/submit/entities/submit.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDoc>,
    @InjectModel(Submit.name) private submitModel: Model<SubmitDoc>,
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
          rank: await this.userRanking(id),
          progress: await this.getProgress(id),
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

  async getProgress(userId: string): Promise<string> {
    const countQuestion = await this.questionService.getQty();
    const countPass = await this.submitModel
      .findOne({
        userId: userId,
        status: true,
      })
      .count();
    if (countQuestion === 0 && countPass === 0) {
      return Number(0).toFixed(2);
    }
    return ((Number(countPass) * 100) / Number(countQuestion)).toFixed(2);
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

  compareScore = (a, b) => {
    if (a.score === b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  };

  async userRanking(id: string): Promise<number> {
    const users = await this.userModel
      .find()
      .select(['score', '_id', 'group'])
      .sort({ score: 'desc' });
    const allUser = users.filter((user) => user.group < 5);
    const sortAllUser = allUser.sort(this.compareScore);
    const rank = sortAllUser.findIndex((user) => String(user._id) === id);
    return rank + 1;
  }

  async remove(id: string) {
    const query: object = { _id: id };
    return await this.userModel.findByIdAndRemove(query).exec();
  }
}
