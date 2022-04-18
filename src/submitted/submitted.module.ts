import { Module } from '@nestjs/common';
import { SubmittedService } from './submitted.service';
import { SubmittedController } from './submitted.controller';
import { SubmitSchema, Submitted } from './entities/submitted.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Submitted.name, schema: SubmitSchema }]),
  ],
  controllers: [SubmittedController],
  providers: [SubmittedService],
})
export class SubmittedModule {}
