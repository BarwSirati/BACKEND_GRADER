import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDoc = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  score: number;

  @Prop({ required: true })
  group: number;

  @Prop({ default: 0 })
  finished: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
