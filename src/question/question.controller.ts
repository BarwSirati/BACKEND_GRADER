import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionService.create(createQuestionDto);
  }

  @Get()
  async findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestion: UpdateQuestionDto,
  ) {
    return await this.questionService.update(id, updateQuestion);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
