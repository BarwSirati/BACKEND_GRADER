import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { QuestionModule } from 'src/question/question.module';
import { Submit, SubmitSchema } from 'src/submit/entities/submit.entity';
import { Module } from '@nestjs/common';
@Module({
  imports: [
    QuestionModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Submit.name, schema: SubmitSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
