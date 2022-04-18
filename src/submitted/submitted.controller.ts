import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SubmittedService } from './submitted.service';
import { CreateSubmittedDto } from './dto/create-submitted.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('submitted')
export class SubmittedController {
  constructor(private readonly submittedService: SubmittedService) {}

  @Post()
  create(@Body() createSubmittedDto: CreateSubmittedDto) {
    return this.submittedService.create(createSubmittedDto);
  }

  @Get()
  findAll() {
    return this.submittedService.findAll();
  }

  @Get(':questionId/:userId')
  findOne(
    @Param('questionId') questionId: string,
    @Param('userId') userId: string,
  ) {
    return this.submittedService.findOne(questionId, userId);
  }
}
