import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true, type: String, required: true })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true, select: false })
  password: string;

  @Prop({ type: SchemaTypes.String, required: true })
  firstName: string;
  @Prop({ type: SchemaTypes.String, required: true })
  lastName: string;

  @Prop({ type: [SchemaTypes.String], default: ['user'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
