import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuesSchema, Question } from './entities/question.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuesSchema }]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
