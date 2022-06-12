import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { CreateSubmitDto } from './dto/create-submit.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

// @UseGuards(JwtGuard)
@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createSubmitDto: CreateSubmitDto) {
    return await this.submitService.create(createSubmitDto);
  }

  @UseGuards(JwtGuard)
  @Get(':questionId')
  async findAll(@Param('questionId') questionId: string) {
    return await this.submitService.findAll(questionId);
  }

  @UseGuards(JwtGuard)
  @Get(':questionId/:userId')
  async findOne(
    @Param('questionId') questionId: string,
    @Param('userId') userId: string,
  ) {
    return await this.submitService.findOne(questionId, userId);
  }
}
