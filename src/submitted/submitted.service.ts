import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSubmittedDto } from './dto/create-submitted.dto';
import { SubmitDoc, Submitted } from './entities/submitted.entity';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Injectable()
export class SubmittedService {
  constructor(
    @InjectModel(Submitted.name) private submitModel: Model<SubmitDoc>,
    private userService: UsersService,
  ) {}
  async create(createSubmittedDto: CreateSubmittedDto): Promise<any> {
    try {
      const query = await this.findOne(
        createSubmittedDto.questionId,
        createSubmittedDto.userId,
      );
      if (query.status) {
        return new HttpException('Success', HttpStatus.OK);
      }
    } catch (err) {
      console.log(err);
    }
    try {
      const createSubmitted = await this.submitModel.create(createSubmittedDto);
      if (await createSubmitted.save()) {
        if (createSubmitted.status) {
          const queryScore = await this.userService.getScore(
            createSubmitted.userId,
          );
          const newScore: number = queryScore.score + createSubmitted.score;
          await this.userService.updateScore(createSubmitted.userId, newScore);
          return new HttpException('Success', HttpStatus.OK);
        }
      }
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Submitted[]> {
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
        .limit(1);
      if (query) {
        return query;
      }
      return [];
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
