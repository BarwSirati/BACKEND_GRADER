import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDoc = User & Document<any, any, any> & { _id: any };
@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
