import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuesDoc = Question & Document;
@Schema()
export class Question {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  unit: string;

  @Prop({ required: true, type: Object })
  input: object;

  @Prop({ required: true, type: Object })
  output: object;

  @Prop({ default: '' })
  issuer: string;

  @Prop({ default: '' })
  detail: string;

  @Prop({ default: '' })
  detail_input: string;

  @Prop({ default: '' })
  detail_output: string;

  @Prop({ default: '' })
  note: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ required: true })
  pdfLink: string;

  @Prop({ required: true })
  rank: number;

  @Prop({ default: '', type: Object })
  ex_input: object;

  @Prop({ default: '', type: Object })
  ex_output: object;

  @Prop({ default: 0 })
  status: boolean;

  @Prop({ default: 0 })
  finished: number;
}

export const QuesSchema = SchemaFactory.createForClass(Question);
