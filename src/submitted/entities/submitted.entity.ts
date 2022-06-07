import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubmitDoc = Submitted & Document;
@Schema({
  timestamps: true,
})
export class Submitted {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  questionId: string;

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true })
  result: string;

  @Prop({ required: true })
  score: number;

  @Prop()
  createdAt: Date;
}
export const SubmitSchema = SchemaFactory.createForClass(Submitted);
