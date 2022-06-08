import { forwardRef, Module } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitController } from './submit.controller';
import { SubmitSchema, Submit } from './entities/submit.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: Submit.name, schema: SubmitSchema }]),
  ],
  controllers: [SubmitController],
  providers: [SubmitService],
  exports: [SubmitService],
})
export class SubmitModule {}
