import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { CreateSubmitDto } from './dto/create-submit.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Post()
  create(@Body() createSubmitDto: CreateSubmitDto) {
    return this.submitService.create(createSubmitDto);
  }

  @Get()
  findAll() {
    return this.submitService.findAll();
  }

  @Get(':questionId/:userId')
  findOne(
    @Param('questionId') questionId: string,
    @Param('userId') userId: string,
  ) {
    return this.submitService.findOne(questionId, userId);
  }
}
