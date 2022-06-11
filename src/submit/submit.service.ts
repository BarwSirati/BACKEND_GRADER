import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSubmitDto } from './dto/create-submit.dto';
import { SubmitDoc, Submit } from './entities/submit.entity';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Injectable()
export class SubmitService {
  constructor(
    private userService: UsersService,
    @InjectModel(Submit.name) private submitModel: Model<SubmitDoc>,
  ) {}
  async create(createSubmitDto: CreateSubmitDto): Promise<any> {
    try {
      const query = await this.findOne(
        createSubmitDto.questionId,
        createSubmitDto.userId,
      );
      if (query.status) {
        const id = { _id: query._id.toString() };
        const userId = { _id: query.userId };
        await this.submitModel.findByIdAndUpdate(id, createSubmitDto).exec();
        if (createSubmitDto.status == false) {
          const score: number = query.score;
          await this.userService.updateFinished(userId, score);
        }
        return new HttpException('Success', HttpStatus.OK);
      }
    } catch (err) {
      console.log(err);
    }
    try {
      const createSubmit = await this.submitModel.create(createSubmitDto);
      if (await createSubmit.save()) {
        if (createSubmit.status) {
          const queryScore = await this.userService.getScore(
            createSubmit.userId,
          );
          const newScore: number = queryScore.score + createSubmit.score;
          await this.userService.updateScore(createSubmit.userId, newScore);
          return new HttpException('Success', HttpStatus.OK);
        }
      }
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Submit[]> {
    const query = await this.submitModel.find().exec();
    return query;
  }
  async findOne(questionId: string, userId: string): Promise<any> {
    try {
      const query = await this.submitModel
        .findOne({
          questionId: questionId,
          userId: userId,
        })
        .sort({ $natural: -1 })
        .limit(1)
        .exec();
      if (query) {
        return query;
      }
      return [];
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
