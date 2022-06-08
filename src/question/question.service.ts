import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuesDoc, Question } from './entities/question.entity';
import mongoose from 'mongoose';

@Injectable()
export class QuestionService {
  constructor(@InjectModel(Question.name) private quesModel: Model<QuesDoc>) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    try {
      const createQuestion = await this.quesModel.create(createQuestionDto);
      return createQuestion.save();
    } catch (err) {}
  }

  async findAll(): Promise<Question[]> {
    return await this.quesModel.find({ status: true }).exec();
  }

  async findOne(id: string) {
    try {
      const query: object = {
        _id: new mongoose.Types.ObjectId(id),
        status: true,
      };
      return await this.quesModel.findOne(query).exec();
    } catch (err) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
  }

  async getQty(): Promise<number> {
    return await this.quesModel.find().count();
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    try {
      if (await this.findOne(id)) {
        const query: object = { _id: id };
        return await this.quesModel
          .findByIdAndUpdate(query, updateQuestionDto)
          .exec();
      }
    } catch (err) {
      console.log(err.code);
    }
  }

  async remove(id: string) {
    const query: object = { _id: new mongoose.Types.ObjectId(id) };
    return await this.quesModel.findByIdAndRemove(query).exec();
  }
}
