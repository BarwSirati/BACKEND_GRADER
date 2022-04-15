import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuesDoc = Question & Document;
@Schema()
export class Question {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Object })
  input: object;

  @Prop({ required: true, type: Object })
  output: object;

  @Prop({ default: '' })
  issuer: string;

  @Prop({ default: '' })
  detail: string;

  @Prop({ required: true })
  rank: number;

  @Prop({ default: 0 })
  status: boolean;

  @Prop({ default: 0 })
  finished: number;
}

export const QuesSchema = SchemaFactory.createForClass(Question);
